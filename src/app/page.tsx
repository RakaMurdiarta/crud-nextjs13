import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { IUser } from "../../models/user";

interface IUserq {
  user: IUser;
}
const Page = async () => {
  const session: IUserq | null = await getServerSession(authOptions);
  return <pre>{JSON.stringify(session?.user?.email, null, 2)}</pre>;
};

export default Page;
