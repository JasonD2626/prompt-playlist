"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");

async function handleSubmit(e: any) {
  e.preventDefault();
  console.log("submit");

  try {
    const res = await fetch("/api/create-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log("response:", data);
    setUrl(data.url);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}


  if (!session) {
    return (
      <main className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <button
          onClick={() => signIn("spotify")}
          className="bg-green-500 px-6 py-3 rounded-lg font-bold"
        >
          Login with Spotify
        </button>
      </main>
    );
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. Finance bro playlist"
          className="border p-2 w-full bg-white text-black pointer-events-auto opacity-100"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 w-full">
          Generate Playlist
        </button>
      </form>

      {url && (
        <div className="mt-8 flex justify-center">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${url.split("/").pop()}`}
            width="300"
            height="380"
            allow="encrypted-media"
          />
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button onClick={() => signOut()} className="text-red-500 underline">
          Logout
        </button>
      </div>
    </main>
  );
}
