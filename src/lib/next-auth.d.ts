import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      fullName: string;
      roles: string[];
      clientId?: int;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expirationDate: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      userId: string;
      fullName: string;
      roles: string[];
      clientId?: int;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expirationDate: string;
    };
  }
}
