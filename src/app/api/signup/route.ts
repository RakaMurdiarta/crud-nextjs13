import { connectDB } from "@/lib/ConnectDB";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import User, { IUser } from "../../../../models/user";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await connectDB().catch((err) => NextResponse.json({ err: err }));
  // console.log(await request.json())
  if (request.method === "POST") {
    const { fullname, email, password } = await request.json();

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return NextResponse.json({ msg: "user exist" }, { status: 409 });
    } else {
      if (password.length < 6) {
        return NextResponse.json(
          { msg: "password should be 6 character" },
          { status: 403 }
        );
      }

      const hashpass = await hash(password, 12);

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

        return NextResponse.json(resp, { status: 200 });
      } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
          // return NextResponse.json({ msg: error }, { status: 409 });
          for (let field in error.errors) {
            const msg = error.errors[field].message;
            return NextResponse.json({ msg: msg }, { status: 409 });
          }
        }
        return NextResponse.json({ msg: error });
      }
    }
  }
}
