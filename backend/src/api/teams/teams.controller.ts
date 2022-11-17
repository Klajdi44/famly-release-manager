import { Request, Response } from 'express';

const TEAMS = [
  { id: 1, name: 'Growth' },
  { id: 2, name: 'Development' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Product Manager' },

];

export const getTeams = (req: Request, res: Response) => {
  res.send(TEAMS);
};