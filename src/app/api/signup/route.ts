import { connectDB } from "@/lib/ConnectDB";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import User, { IUser } from "../../../../models/user";
import mongoose from "mongoose";

export async function POST(request: Request) {
  connectDB().catch((err) => NextResponse.json({ err: err }));
  // console.log(await request.json())
  if (request.method === "POST") {
    const { fullname, email, password } = await request.json();

    const userExist = await User.findOne({ email: email });
    console.log("user", userExist);
    if (userExist) {
      return NextResponse.json({ msg: "user exist" });
    } else {
      if (password.length < 6) {
        return NextResponse.json(
          { msg: "password should be 6 character" },
          { status: 404, statusText: "conflict woiii" }
        );
      }

      const hashpass = await hash(password, 12);
      console.log("hash", hashpass);

      console.log(fullname, email, password);

      try {
        const user: IUser = await User.create({
          fullname,
          email,
          password: hashpass,
        });

        const resp = {
          fullname: user.fullname,
          email: user.email,
          id: user._id,
        };
        return NextResponse.json(
          { msg: resp },
          { status: 200, statusText: "oke" }
        );
      } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
          for (let field in error.errors) {
            console.log(field)
            const msg = error.errors[field].message;
            return NextResponse.json({ msg: msg }, { status: 409 });
          }
        }
      }
    }
  }
}
