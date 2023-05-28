"use client";

import { ISession } from "@/types/types";
import { IUser } from "../../../models/user";
import Container from "../Container";
import { useSession, signIn, signOut } from "next-auth/react";

interface IUserq {
  user: IUser;
}

const Headers = () => {
  const { data, status } = useSession();

  const user: ISession | undefined = data?.user as ISession | undefined;
  // Dalam konteks ini, Anda menggunakan as ISession untuk memberi tahu TypeScript bahwa Anda yakin bahwa sessionData?.user memiliki tipe ISession atau dapat dianggap sebagai ISession. Dengan demikian, Anda dapat menetapkan hasil ekspresi tersebut ke dalam variabel user yang memiliki tipe ISession | undefined.
  console.log(data, status);
  return (
    <header className="bg-fuchsia-600 sticky left-0 top-0">
      <Container>
        <div className="flex justify-between items-center py-6">
          <h1>CRUD NEXT APP</h1>
          <nav>
            <ul className="flex items-center justify-center gap-10">
              <li>{user?.email}</li>
              <li>About</li>
              {!user ? (
                <li
                  onClick={() => {
                    signIn();
                  }}
                >
                  Login
                </li>
              ) : (
                <li
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Headers;
