// export { GET, POST } from "@/app/lib/auth";

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { pages } from "next/dist/build/templates/app-page";

const prisma = new PrismaClient();

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          console.log("Missing credentials");
          throw new Error("Missing credentials");
        }
        console.log("Credentials:", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        console.log("User:", user);
        if (!user) {
          console.log("User not found");
          throw new Error("User not found");
        }

        return user;
      },
    }),
  ],
  pages:{
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = {
          isAdmin: user.isAdmin || false,
          isManager: user.isManager || false,
          isLeader: user.isLeader || false,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user  = {
        id: token.id,
        email: token.email,
        role: token.role, // מעבירים את כל ההרשאות בבת אחת
        token: token
      };
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token", // שם הקוקי
      options: {
        httpOnly: true, // מונע גישה לצד הלקוח
        secure: process.env.NODE_ENV === "production", // רק ב-HTTPS בסביבת פרודקשן
        sameSite: "strict", // מונע שליחה של קוקי בין אתרים
        path: "/", // בדרך כלל ניתן להגדיר רק עבור כל האתר
        maxAge: 30 * 24 * 60 * 60, // תוקף הקוקי (30 יום)
      },
    },
  },
 
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions)



