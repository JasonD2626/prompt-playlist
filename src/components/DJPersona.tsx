// src/components/DJPersona.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface DJPersonaProps {
  loading: boolean;
  error: string | null;
}

export default function DJPersona({ loading, error }: DJPersonaProps) {
  // Ref for the audio element (scratching sound)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Whenever `loading` becomes true, play the scratch sound (if available)
  useEffect(() => {
    if (loading && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Browsers often block autoplay until user interaction—ignore errors
      });
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center mb-4 space-y-2">
      {/* Loading Message: DJ Scraps is spinning your tracks */}
      {loading && (
        <p className="text-yellow-600 font-bold animate-pulse">
          DJ Scraps is spinning your tracks… hold tight!
        </p>
      )}

      {/* Error Message: Themed “dropped the beat” style */}
      {error && (
        <p className="text-red-500 bg-red-100 px-3 py-1 rounded-lg">
          Oops! DJ Scraps dropped the beat: {error}
        </p>
      )}s
      
    </div>
  );
}
