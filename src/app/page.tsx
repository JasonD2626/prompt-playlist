// src/app/page.tsx
"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import NProgress from "nprogress";

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    NProgress.start();
    setLoading(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const { id } = await res.json();
      if (id) setPlaylistId(id);
      else console.error("API error, no id:", await res.text());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      NProgress.done();
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <main className="h-screen flex items-center justify-center bg-black text-white">
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
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Finance bro playlist"
          disabled={loading}
          className="border p-2 w-full text-black placeholder-gray-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="
            bg-black text-white px-4 py-2 w-full
            cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
            hover:bg-gray-800 active:scale-95 transition duration-75 ease-out
          "
        >
          {loading ? "Creating playlist…" : "Generate Playlist"}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {playlistId && (
        <div className="mt-8 flex justify-center">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="300"
            height="380"
            allow="encrypted-media"
          />
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => signOut()}
          className="text-red-500 underline"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
