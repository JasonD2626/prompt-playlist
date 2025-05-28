import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Authenticate
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    console.log("🔑 token:", token);

    if (!token?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Read prompt
    const { prompt } = await req.json();

    // 3️⃣ Call OpenAI
    const ai = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You’re a music expert…" },
        { role: "user", content: `List 10 songs or artists for: "${prompt}".` },
      ],
    });
    const text = ai.choices[0]?.message?.content || "";
    const queries = text
      .split("\n")
      .map((l) => l.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    // 4️⃣ Search Spotify
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    };
    const uris: string[] = [];
    for (const q of queries) {
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=1`,
        { headers }
      );
      const d = await r.json();
      const track = d.tracks?.items?.[0];
      if (track) uris.push(track.uri);
    }

    // 5️⃣ Create & fill playlist
    const me = await fetch("https://api.spotify.com/v1/me", { headers }).then((r) => r.json());
    const pl = await fetch(
      `https://api.spotify.com/v1/users/${me.id}/playlists`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ name: `Prompt: ${prompt}`, public: false }),
      }
    ).then((r) => r.json());
    await fetch(`https://api.spotify.com/v1/playlists/${pl.id}/tracks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ uris }),
    });

    // 6️⃣ Return JSON success
    return NextResponse.json({ url: pl.external_urls.spotify });
  } catch (err: any) {
    console.error("🚨 create-playlist error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
