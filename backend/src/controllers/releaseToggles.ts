import { Request, Response } from "express";

const FEATURES = [
  { id: 1, name: "Profile image", country: "Uk", segment: 225 },
  { id: 2, name: "Face detection sign off", country: "Dk", segment: 334 },
  { id: 3, name: "Fingerprint authenication", country: "Uk", segment: 554 },
];

export const getAllReleaseToggles = (req: Request, res: Response) => {
  const session = req.session;
  // req.session.save();

  req.session.user = {
    id: req.sessionID,
  };

  console.log({ session, sessionId: req.sessionID });

  res.send(FEATURES);
};