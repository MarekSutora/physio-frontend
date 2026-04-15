import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { getErrorMessage } from "@/lib/utils/utils";

const AUTH_UNAVAILABLE_MESSAGE =
  "Prihlasovanie je momentálne nedostupné. Skúste to prosím neskôr.";

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

      throw new Error(getErrorMessage(error, AUTH_UNAVAILABLE_MESSAGE));
    }

    const response = await res.json();

    return {
      ...token,
      backendTokens: response,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error, AUTH_UNAVAILABLE_MESSAGE));
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
            const error = await res.text();

            throw new Error(getErrorMessage(error, AUTH_UNAVAILABLE_MESSAGE));
          }
        } catch (error) {
          throw new Error(getErrorMessage(error, AUTH_UNAVAILABLE_MESSAGE));
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
  logger: {
    error() {},
    warn() {},
    debug() {},
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
