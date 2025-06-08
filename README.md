# DJ Z: AI-Powered Spotify Playlist Generator

**DJ Z** is your AI-powered Spotify DJ. Describe a vibe in plain language — like  
**"MIT coding session"** or **"Kanye songs that make you levitate"** — and DJ Z builds a playlist on the spot using **OpenAI** + **Spotify Web API**.

Inspired by Spotify's DJ, but entirely your own.



<img width="1510" alt="SCR-20250608-khqe" src="https://github.com/user-attachments/assets/67a41dc6-18eb-4f34-ac6f-fb94877c3ba2" />













[Live Demo](https://prompt-playlist.vercel.app)

---

## Features

- OpenAI GPT-3.5 generates relevant tracks based on user input  
- Searches top tracks for each suggestion via Spotify Web API  
- Creates a new Spotify playlist in your account  
- Instantly populates it and returns a preview  
- Fully deployed with Vercel  

---

## Tech Stack

- Next.js 15 (App Router)  
- OpenAI SDK  
- Spotify Web API  
- Tailwind CSS  
- NextAuth.js  
- Vercel (deployment)  

---

## Flow Overview

1. User enters a text prompt  
2. OpenAI generates 10 music suggestions  
3. Each suggestion is searched on Spotify  
4. The top-matching tracks are collected  
5. A new private playlist is created  
6. Tracks are added to the playlist  
7. User gets an embedded preview  

---

## Quickstart

### 1. Clone and install

```bash
git clone https://github.com/JasonD2626/prompt-playlist
cd dj-z
npm install
```

### 2. Configure Environment Variables

First, copy the example environment file:

```bash
cp .env.example .env.local
```

Then fill in your secrets in `env.local`

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
OPENAI_API_KEY=your_openai_api_key
```

### 3. Start Development

```bash
npm run dev
```

The app will start locally at `http://localhost:3000`.


## Deployment 

This app is optimized for Vercel.

After pushing your project to GitHub:

1. Go to vercel.com.
2. Import your GitHub repo.
3. In the project settings, set these **Environment Variables**.
    - `NEXTAUTH_URL`  
    - `NEXTAUTH_SECRET` 
    - `SPOTIFY_CLIENT_ID`  
    - `SPOTIFY_CLIENT_SECRET`  
    - `OPENAI_API_KEY`
4. Deploy the project.

### License

MIT - use it freely, remix respectfully.

   





