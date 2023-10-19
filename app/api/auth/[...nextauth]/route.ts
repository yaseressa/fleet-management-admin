import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import models from "../../../../models";
import { compareSync } from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development" ? true : false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        //@ts-ignore
        const User = await models.User.findOne({
          where: {
            email: credentials?.email,
          },

          include: [
            //@ts-ignore
            {
              model: models.UserRole,
              required: false,
            },
          ],
        });
        console.log(User);
        if (
          User != null &&
          compareSync(credentials?.password as string, User.password)
        ) {
          return User;
        } else if (
          User != null &&
          !compareSync(credentials?.password as string, User.password)
        ) {
          throw new Error("invalid password.");
        } else {
          throw new Error("account doesn't exist.");
        }
      },
    }),
  ],
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      //@ts-ignore
      if (token) session.user = token?.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
