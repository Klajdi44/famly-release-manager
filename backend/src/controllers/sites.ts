import { Request, Response } from "express";
// const { sequelize } = require("../sequelize/models");
const { Site, Subscription, Country, Segment, SiteSegment } = require("../sequelize/models");


export const getAllSites = async (req: Request, res: Response) => {

  // TODO: Validate req: user

  // FROM Klajdi
  // const session = req.session;

  // req.session.user = {
  //   id: req.sessionID,
  // };

  // console.log({ session, sessionId: req.sessionID });
  console.log('** Running controller: getAllSites');
  // return res.status(200).json({success: 'You have reached getAllSites controller'});
  try {
    // const sites = await Site.findAll({
    //   include: [
    //     {
    //       model: SiteSegment,
    //       include: [Site, Segment]
    //     }
    //   ]
    // });
    // const sites = await Site.findAll({include: [Country, Subscription]});
    const sites = await Site.findAll({include: Segment});
    // const segments = await Segment.findAll({include: Site});
    // console.log('*** sites variable: ', segments);
    // console.log('*** sites variable: ', sites);
    // return res.status(200).json(segments);
    return res.status(200).json(sites);
  } catch (error) {
    return res.status(500).json({error: 'Server error - could not find release toggles...'});
  }
};

export const getOneSite = async (req: Request, res: Response) => {
  console.log('** Running controller: getOneReleaseToggle');

  // TODO: Validate req.params.id
  // Make sure to check if it is an INT / NUMBER

  try {
    const site = await Site.findByPk(req.params.id, {include: [Country, Subscription, Segment]});
    // const site = await Site.findByPk(req.params.id, {include: [Country as 'country', Subscription as 'sub']});

    if (site === null) { return res.status(404).json({message: 'This release toggle does not exist...'}); }

    return res.status(200).json(site);

  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSite = async (req: Request, res: Response) => {

  console.log('** Running controller: createReleaseToggle');

  console.log('** Request body', req.body);

  // TODO: Validate Data
  if (!req.body.name) { return res.status(400).json({error: 'Name must be defined..'}); }
  if (!req.body.description) { return res.status(400).json({error: 'Description must be defined..'}); }
  if (!req.body.userId) { return res.status(400).json({error: 'User ID must be defined..'}); }

  try {
    const site = await Site.create({
      // name: req.body.name,
      // description: req.body.description,
      // releaseAt: new Date(),
      // createdAt: new Date(),
      // updatedAt: new Date(),
      // userId: req.body.userId,
    });
    return res.status(201).json(site);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateOneSite = async (req: Request, res: Response) => {
  console.log('** Running controller: updateOneReleaseToggle', req.method);

  // TODO: Validate req.params.id
  console.log('** Req body: ', req.body);

  interface Payload {
    name?: string;
    description?: string;
    userId?: number;
  }
  let payload: Payload = {}
  // if (req.body.name) { payload['name'] = req.body.name }
  // if (req.body.description) { payload['description'] = req.body.description }
  // if (req.body.userId) { payload['userId'] = req.body.userId }

  try {
    const site = await Site.update(payload, {
      where: {
        id: req.params.id
      },
      // returning: true, // Can be used to return data values
    })
    console.log('** Release Toggle after update: ', site);
    return res.status(204).json(site); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneSite = async (req: Request, res: Response) => {
  console.log('** Running controller: deleteOneReleaseToggle', req.method);
  console.log('id: ',req.params.id, 'type of id: ', typeof req.params.id);

  // TODO: Validate req.params.id

  try {
    const site = await Site.destroy({
      where: {
        id: req.params.id,
      }
    });
    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json(error);
  }
};
