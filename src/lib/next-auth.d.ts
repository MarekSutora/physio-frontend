import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      fullName: string;
      roles: string[];
      personId: int;
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
      personId: int;
    };

    userTokens: {
      accessToken: string;
      refreshToken: string;
      accessTokenExpirationDate: string;
    };
  }
}
