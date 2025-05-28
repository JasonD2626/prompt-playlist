import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";

// Define your NextAuth options with proper typing
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
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the accessToken available on the session object
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

// Pass authOptions into NextAuth handler
const handler = NextAuth(authOptions);

// Export GET and POST methods
export { handler as GET, handler as POST };
