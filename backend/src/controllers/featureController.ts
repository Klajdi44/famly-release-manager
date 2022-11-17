import { Request, Response } from "express";

const FEATURES = [
  { id: 1, name: "Profile image", country: "Uk", segment: 225 },
  { id: 2, name: "Face detection sign off", country: "Dk", segment: 334 },
  { id: 3, name: "Fingerprint authenication", country: "Uk", segment: 554 },
];

export const getAllFeatures = (req: Request, res: Response) => {
  res.send(FEATURES);
};
