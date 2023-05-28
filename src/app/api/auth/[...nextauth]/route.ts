import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { IUser } from "../../../../../models/user";
import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB().catch((err) => {
          throw new Error(err);
        });

        const resp: IUser = await User.findOne({
          email: credentials!.email,
        }).select("+password");

        if (!resp) {
          //   return NextResponse.json({ msg: "user not exist" });
          throw new Error("Invalid Credentials");
        }

        const comparePass = await compare(credentials!.password, resp.password);

        if (!comparePass) {
          throw new Error("Invalid Credentials");
        }
        const user = {
          id: resp?._id.toString(),
          email: resp?.email,
          fullname: resp?.fullname,
          accessToken: "dadad",
          refreshToken: "afaf",
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  //   pages: {
  //     signIn: "/api/login",
  //   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
