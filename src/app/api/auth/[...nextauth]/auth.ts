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
          refreshToken: token.userTokens.refreshToken,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      const error = await res.text();

      throw new Error(getErrorMessage(error));
    }

    const response = await res.json();

    return {
      ...token,
      backendTokens: response,
    };
  } catch (error) {
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
            console.log(res);
          if (res.ok) {
            const user = await res.json();
            return user;
          } else {
            const error = await res.text();
            if (error) {
              throw new Error(error);
            } else {
              throw new Error("Nastala chyba pri prihlasovaní.");
            }
          }
        } catch (error) {
          console.log(error);
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
        new Date(token.userTokens.accessTokenExpirationDate).getTime()
      )
        return token;

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = {
        fullName: token.user.fullName,
        roles: token.user.roles,
      };
      session.expires = token.userTokens.accessTokenExpirationDate;

      return session;
    },
  },
  pages: {
    signIn: "/prihlasenie",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
