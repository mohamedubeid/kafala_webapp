import { sessionOptions } from "helpers/auth/session";
import { IronSessionData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<IronSessionData>
) {
  req.session.destroy();
  res.json({ user: undefined, token: undefined });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
