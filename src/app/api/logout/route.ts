import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const deleteCookieHeader = `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  return NextResponse.json(
    { msg: "success" },
    {
      headers: {
        "Set-Cookie": deleteCookieHeader,
      },
    }
  );
}
