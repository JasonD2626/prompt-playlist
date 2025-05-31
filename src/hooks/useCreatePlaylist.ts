// src/hooks/useCreatePlaylist.ts
"use client";

import { useState } from "react";

interface UseCreatePlaylistResult {
  createPlaylist: (prompt: string) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useCreatePlaylist(): UseCreatePlaylistResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * createPlaylist calls your Next.js API route at /api/create-playlist,
   * passing the user-entered prompt, and returns the new Spotify playlist URL
   * if successful. On failure, it sets an error message and returns null.
   */
  async function createPlaylist(prompt: string): Promise<string | null> {
    setError(null);      // clear any previous error
    setLoading(true);

    try {
      const res = await fetch("/api/create-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // Attempt to parse JSON from the response
      const data = await res.json();

      if (!res.ok) {
        // If the status is not 2xx, set error from data.error or a generic message
        const msg = data?.error || "Unknown server error";
        setError(msg);
        return null;
      }

      // If we got a { url: string } back, return the URL
      if (data?.url) {
        return data.url as string;
      } else {
        // If no URL was returned, treat it as an error
        const msg = data?.error || "No playlist URL returned";
        setError(msg);
        return null;
      }
    } catch (networkErr: any) {
      // Network or parsing error
      setError(networkErr?.message || "Network error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createPlaylist, loading, error };
}
