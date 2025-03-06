import { sessionOptions } from "helpers/auth/session";
import { IronSessionData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<IronSessionData>
) {
  if (req.session.user) {
    res.json({
      user: { ...req.session.user },
    });
  } else {
    res.json({ user: undefined });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
