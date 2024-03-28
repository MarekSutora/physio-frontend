import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { getErrorMessage } from "@/lib/utils/utils";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken: token.backendTokens.refreshToken,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const response = await res.json();
    return {
      ...token,
      backendTokens: response,
    };
  } catch (error) {
    console.log("refreshToken error", error);
    throw new Error(getErrorMessage(error));
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            const user = await res.json();
            return user;
          } else {
            const error = await res.text(); // Získame chybovú správu ako text
            if (error === "Nesprávne prihlasovacie údaje.") {
              throw new Error(error);
            } else {
              throw new Error("Nastala chyba pri prihlasovaní.");
            }
          }
        } catch (error) {
          console.log("authorize error", error);
          throw new Error(getErrorMessage(error));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (
        new Date().getTime() <
        new Date(token.backendTokens.expirationDate).getTime()
      )
        return token;

      return await refreshToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
