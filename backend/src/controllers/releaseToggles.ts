import { Request, Response } from "express";

const FEATURES = [
  { id: 1, name: "Profile image", country: "Uk", segment: 225 },
  { id: 2, name: "Face detection sign off", country: "Dk", segment: 334 },
  { id: 3, name: "Fingerprint authenication", country: "Uk", segment: 554 },
];

export const getAllReleaseToggles = (req: Request, res: Response) => {
  console.log(req.headers.authorization);

  res.send(FEATURES);
};
