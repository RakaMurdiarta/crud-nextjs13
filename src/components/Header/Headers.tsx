"use client";

import { ISession } from "@/types/types";
import Container from "../Container";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Headers = () => {
  const { data, status, update } = useSession();
  const router = useRouter();

  const logout = async () => {
    const response = await fetch("http://localhost:3000/api/logout");

    if (response.ok) {
      // Mengatur ulang halaman setelah logout
      signOut();
    } else {
      // Penanganan kesalahan jika gagal logout
      console.error("Gagal logout");
    }
  };

  const user: ISession | undefined = data?.user as ISession | undefined;
  //Note: Dalam konteks ini, Anda menggunakan as ISession untuk memberi tahu TypeScript bahwa Anda yakin bahwa sessionData?.user memiliki tipe ISession atau dapat dianggap sebagai ISession. Dengan demikian, Anda dapat menetapkan hasil ekspresi tersebut ke dalam variabel user yang memiliki tipe ISession | undefined.

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
                    logout();
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
