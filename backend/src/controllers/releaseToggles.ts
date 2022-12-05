import { Request, Response } from "express";
// const { sequelize } = require("../sequelize/models");
const { ReleaseToggle, User } = require("../sequelize/models");


export const getAllReleaseToggles = async (req: Request, res: Response) => {

  // TODO: Validate req: user

  // FROM Klajdi
  // const session = req.session;

  // req.session.user = {
  //   id: req.sessionID,
  // };

  // console.log({ session, sessionId: req.sessionID });
  console.log('** Running controller: getAllReleaseToggles');

  try {
    const releaseToggles = await ReleaseToggle.findAll({ include: User });
    return res.status(200).json(releaseToggles);
  } catch (error) {
    return res.status(500).json({error: 'Server error - could not find release toggles...'});
  }

};

export const getOneReleaseToggle = async (req: Request, res: Response) => {
  console.log('** Running controller: getOneReleaseToggle');

  // TODO: Validate req.params.id
  // Make sure to check if it is an INT / NUMBER

  try {
    const releaseToggle = await ReleaseToggle.findByPk(req.params.id, { include: User });

    if (releaseToggle === null) { return res.status(404).json({message: 'This release toggle does not exist...'}); }

    return res.status(200).json(releaseToggle);

  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createReleaseToggle = async (req: Request, res: Response) => {

  console.log('** Running controller: createReleaseToggle');

  console.log('** Request body', req.body);

  // TODO: Validate Data
  if (!req.body.name) { return res.status(400).json({error: 'Name must be defined..'}); }
  if (!req.body.description) { return res.status(400).json({error: 'Description must be defined..'}); }
  if (!req.body.userId) { return res.status(400).json({error: 'User ID must be defined..'}); }

  try {
    const releaseToggle = await ReleaseToggle.create({
      name: req.body.name,
      description: req.body.description,
      releaseAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.body.userId,
    });
    return res.status(201).json(releaseToggle);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateOneReleaseToggle = async (req: Request, res: Response) => {
  console.log('** Running controller: updateOneReleaseToggle', req.method);

  // TODO: Validate req.params.id
  console.log('** Req body: ', req.body);

  // Data payload for update
  // let payload = {};
  // payload: { [key: string]: string } = {};
  // payload: any = {};
  interface Payload {
    name?: string;
    description?: string;
    userId?: number;
  }
  let payload: Payload = {}
  if (req.body.name) { payload['name'] = req.body.name }
  if (req.body.description) { payload['description'] = req.body.description }
  if (req.body.userId) { payload['userId'] = req.body.userId }

  try {
    const releaseToggle = await ReleaseToggle.update(payload, {
      where: {
        id: req.params.id
      },
      // returning: true, // Can be used to return data values
    })
    console.log('** Release Toggle after update: ', releaseToggle);
    return res.status(204).json(releaseToggle); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneReleaseToggle = async (req: Request, res: Response) => {
  console.log('** Running controller: deleteOneReleaseToggle', req.method);
  console.log('id: ',req.params.id, 'type of id: ', typeof req.params.id);

  // TODO: Validate req.params.id

  try {
    const releaseToggle = await ReleaseToggle.destroy({
      where: {
        id: req.params.id,
      }
    });
    return res.status(200).json(releaseToggle);
  } catch (error) {
    return res.status(500).json(error);
  }
};
