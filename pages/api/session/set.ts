import { sessionOptions } from "helpers/auth/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function setSessionRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = await req.body;
  // rememberMe
  try {
    req.session.user = user;
    req.session.token = token;
    await req.session.save();
    return res.json({});
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(setSessionRoute, sessionOptions);
