import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "@/helpers/auth/session";

export const middleware = async (req: NextRequest) => {
  console.log("Start Middleware");

  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  console.log("session content: ", session);

  const { token } = session;
  if (token) {
    let headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const authRequestResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`,
      {
        headers,
      }
    );

    console.log("authRequestResult status: ", authRequestResult.status);

    if (authRequestResult.status === 200 || authRequestResult.status === 201) {
      const result = await authRequestResult.json();
      console.log("result: ", result);

      const isLoggedIn = !!session.user;

      session.user = result;
      await session.save();
      return res;
    }

    session.destroy();
  }

  console.log("end of middleware");

  return res;
};
