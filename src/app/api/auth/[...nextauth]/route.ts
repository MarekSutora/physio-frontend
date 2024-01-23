import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
    {
      method: "POST",
      body: JSON.stringify({ refreshToken: token.backendTokens.refreshToken }),
      headers: { "Content-Type": "application/json" },
    },
  );

  const response = await res.json();

  console.log("refreshed", response);

  return {
    ...token,
    backendTokens: response,
  };
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (!res.ok) {
            return null;
          }

          const user = await res.json();
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.accessTokenExpirationDate)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/prihlasenie",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
