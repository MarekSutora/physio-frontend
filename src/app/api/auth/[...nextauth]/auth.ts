import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

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

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/prihlasenie",
  },
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
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (res.status == 401) {
            //console.log(res.statusText);

            return null;
          }
          const user = await res.json();

          //console.log("authorize - user", user);

          return user;
        } catch (error) {
          //console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      //console.log("jwt", token);
      //console.log("jwt", user);

      if (
        new Date().getTime() <
        new Date(token.backendTokens.expirationDate).getTime()
      )
        return token;

      return await refreshToken(token);
    },

    async session({ session, token }) {
      //console.log("session", token);
      //console.log("session", session);

      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
