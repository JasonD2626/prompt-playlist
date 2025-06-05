// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";

// Properly typed NextAuth config
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "playlist-modify-public playlist-modify-private user-read-email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Only attach Spotify's access token, not OpenAI's
      if (account?.provider === "spotify") {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
