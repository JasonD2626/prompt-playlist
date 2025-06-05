// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import DJIntro from "../components/DJIntro";
import DJPersona from "../components/DJPersona";
import { useCreatePlaylist } from "../hooks/useCreatePlaylist";

export default function Home() {
  const { data: session } = useSession();
  const { createPlaylist, loading, error } = useCreatePlaylist();
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  // 1) State to control when the chat box (input) appears:
  const [showChat, setShowChat] = useState(false);

  // 2) On mount, wait ~1.5 seconds then reveal the chat input
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 1500); // 1.5 seconds delay for "DJ intro" reading time
    return () => clearTimeout(timer);
  }, []);

  // 3) Handle form submission when the user presses Enter
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Hide any existing playlist, start top-bar and persona loading
    setUrl(null);
    NProgress.start();

    const playlistUrl = await createPlaylist(prompt);
    NProgress.done();

    if (playlistUrl) {
      setUrl(playlistUrl);
    }
  }

  // 4) If not logged in, prompt Spotify sign-in
  if (!session) {
    return (
      <main className="h-screen flex items-center justify-center bg-black text-white">
        <button
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
          className="bg-green-500 px-6 py-3 rounded-lg font-bold cursor-pointer"
        >
          Login with Spotify
        </button>
      </main>
    );
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      {/* ===== Section 1: DJ Introduction ===== */}
      <DJIntro />

      {/* ===== Section 2: (Optional) DJ Persona for Loading / Error ===== */}
      <DJPersona loading={loading} error={error} />

      {/* ===== Section 3: Chat-Style Prompt Input ===== */}
      <div
        // We wrap in a div so we can animate opacity on mount
        className={`
          transition-opacity duration-700 ease-in-out
          ${showChat ? "opacity-100" : "opacity-0"}
        `}
      >
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your playlist idea and hit Enter..."
            disabled={loading}
            className="
              w-full
              bg-white
              placeholder-gray-500
              text-gray-900
              border border-gray-300
              rounded-full
              px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:placeholder-gray-400
            "
          />
        </form>
      </div>

      {/* ===== Section 4: Display the Playlist (if generated) ===== */}
{url && (
  <>
    <div className="mt-8 flex justify-center">
      <iframe
        src={url.replace("https://open.spotify.com/", "https://open.spotify.com/embed/")}
        width="300"
        height="380"
        allow="encrypted-media"
        className="rounded-lg shadow-md"
      />
    </div>

    {/* ===== Section 4.5: Regenerate Button ===== */}
    <div className="mt-4 flex justify-center">
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Don’t like this playlist? I can work my magic again...
      </button>
    </div>
  </>
)}

{/* ===== Section 5: Logout Button ===== */}
<div className="mt-8 flex justify-center">
  <button
    onClick={() => signOut()}
    className="text-red-500 underline cursor-pointer"
  >
    Logout
  </button>
</div>

    </main>
  );
}
