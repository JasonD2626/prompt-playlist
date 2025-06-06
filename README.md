# 🎵 DJ Z: AI-Powered Spotify Playlist Generator

**DJ Z** is your AI-powered Spotify DJ. Describe a vibe in plain language — like  
**"MIT coding session"** or **"Kanye songs that make you levitate"** — and DJ Z builds a playlist on the spot using **OpenAI** + **Spotify Web API**.

Inspired by Spotify's DJ, but entirely your own.

🔗 [Live Demo](https://prompt-playlist-ebbd.vercel.app)

---

## ✨ Features

- OpenAI GPT-3.5 generates relevant tracks based on user input  
- Searches top tracks for each suggestion via Spotify Web API  
- Creates a new Spotify playlist in your account  
- Instantly populates it and returns a preview  
- Fully deployed with Vercel  

---

## 📁 Tech Stack

- Next.js 15 (App Router)  
- OpenAI SDK  
- Spotify Web API  
- Tailwind CSS  
- NextAuth.js  
- Vercel (deployment)  

---

## ♻️ Flow Overview

1. User enters a text prompt  
2. OpenAI generates 10 music suggestions  
3. Each suggestion is searched on Spotify  
4. The top-matching tracks are collected  
5. A new private playlist is created  
6. Tracks are added to the playlist  
7. User gets an embedded preview  

---

## ⚡️ Quickstart

### 1. Clone and install

```bash
git clone https://github.com/yourhandle/dj-z.git
cd dj-z
npm install
