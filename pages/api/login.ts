import { sessionOptions } from "helpers/auth/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email: username, password, asStudent } = await req.body;
  // rememberMe
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const authRequestResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authenticate`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          isStudent: !!asStudent,
        }),
        headers,
      }
    );

    if (authRequestResult.status === 201 || authRequestResult.status === 200) {
      const authResult = await authRequestResult.json();
      let result: any = {
        id_token: authResult.id_token,
      };
      const userRequestResult = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`,
        {
          headers: {
            Authorization: `Bearer ${authResult.id_token}`,
          },
        }
      );

      if (
        userRequestResult.status === 201 ||
        userRequestResult.status === 200
      ) {
        const userRes = await userRequestResult.json();
        req.session.user = userRes;
        req.session.token = authResult.id_token;
        result = {
          ...result,
          user: userRes,
        };
        await req.session.save();
      }
      return res.json(result);
    }
    return res.status(401).json({ message: await authRequestResult.json() });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
