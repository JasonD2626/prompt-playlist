// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

// 🔄 Refresh the Spotify access token
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "playlist-modify-public playlist-modify-private user-read-email",
          prompt: "consent", // ✅ Force re-consent to ensure refresh_token is returned
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 🧠 Initial sign in
      if (account) {
        console.log("Spotify account payload:", account); // Optional: inspect once
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account as any).expires_in * 1000,
          refreshToken: account.refresh_token,
        };
      }

      // ⏳ Return previous token if still valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 🔁 Otherwise refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
