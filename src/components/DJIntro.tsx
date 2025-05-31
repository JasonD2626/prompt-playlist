// src/components/DJIntro.tsx
"use client";

import Image from "next/image";
import React from "react";

export default function DJIntro() {
  return (
    <div className="flex flex-col items-center space-y-2 mb-6">
      {/* 1) DJ Avatar */}
      <div className="relative w-28 h-28">
        <Image
          src="/DJZ.png"         // (Drop dj-avatar.png into /public)
          alt="DJ Z Avatar"
          fill
          className="object-contain"
        />
      </div>

      {/* 2) Speech Bubble */}
      <div className="relative bg-white border border-gray-300 rounded-xl px-6 py-4 max-w-md text-left shadow-sm">
        {/* Tail of the bubble: a little rotated square */}
        <div className="absolute bottom-[-8px] left-10 w-4 h-4 bg-white border-b border-l border-gray-300 rotate-45"></div>

        {/* The actual introduction text */}
        <p className="text-gray-800 text-lg leading-relaxed">
          what up. i’m <span className="font-bold">DJ Z</span>. DJ X beat me out for the role of Spotify’s DJ even though he’s extremely under-qualified but whatever, i’m better. what kinda playlist do you want me to hand-make for you?
        </p>
      </div>
    </div>
  );
}
