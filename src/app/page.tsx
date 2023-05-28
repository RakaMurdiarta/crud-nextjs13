import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { IUser } from "../../models/user";
import { ISession } from "@/types/types";

interface IUserq {
  user: IUser;
}
const Page = async () => {
  const session: ISession = await getServerSession(authOptions) as ISession;

  if (!session) {
    return <p>You not Authenticated</p>;
  }
  return <pre>{JSON.stringify(session,null,3)}</pre>;
};

export default Page;
