import { Request, Response } from "express";
// const { sequelize } = require("../sequelize/models");
const { Site, Subscription, Country, Segment, SiteSegment, User } = require("../sequelize/models");


export const getAllSites = async (req: Request, res: Response) => {
  console.log('** Running controller: getAllSites');
  try {
    const sites = await Site.findAll({include: [Country, Subscription, {model: Segment, as: '_segments'}]});

    return res.status(200).json(sites);
  } catch (error) {
    return res.status(500).json({error: 'Server error - could not find release toggles...'});
  }
};

export const getOneSite = async (req: Request, res: Response) => {
  console.log('** Running controller: getOneReleaseToggle');

  // Check if req.params.id is a number
  if (!Number(req.params.id)) { return res.json({error: 'ID is not a number'}); }

  try {
    const site = await Site.findByPk(req.params.id, {include: [Country, Subscription, {model: Segment, as: '_segments'}]});

    // Check if there is data with the provided ID
    if (site === null) { return res.status(404).json({message: 'This release toggle does not exist...'}); }

    return res.status(200).json(site);

  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSite = async (req: Request, res: Response) => {

  // Validate Data
  if (!req.body.name) { return res.status(400).json({error: 'Name must be defined..'}); }
  if (!req.body.countryId) { return res.status(400).json({error: 'countryId must be defined..'}); }
  if (!req.body.subscriptionId) { return res.status(400).json({error: 'subscriptionId must be defined..'}); }

  try {
    const site = await Site.create({
      name: req.body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      countryId: req.body.countryId,
      subscriptionId: req.body.subscriptionId,
    });
    return res.status(201).json(site);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateOneSite = async (req: Request, res: Response) => {
  // Check if req.params.id is a number
  if (!Number(req.params.id)) { return res.json({error: 'ID is not a number'}); }

  interface Payload {
    name?: string;
    countryId?: string;
    subscriptionId?: number;
  }
  let payload: Payload = {}
  if (req.body.name) { payload['name'] = req.body.name }
  if (req.body.countryId) { payload['countryId'] = req.body.countryId }
  if (req.body.subscriptionId) { payload['subscriptionId'] = req.body.subscriptionId }

  try {
    const site = await Site.update(payload, {
      where: {
        id: req.params.id
      },
      // returning: true, // Can be used to return data values
    })
    if (site[0] === 0) { return res.status(404).json({failed: 'No segment matching this ID'}); }
    return res.status(204).json(site); // Research which status code should be used. 200 / 204 / or another?
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOneSite = async (req: Request, res: Response) => {

  // Validate req.params.id
  if (!Number(req.params.id)) { return res.json({error: 'ID is not a number'}); }

  try {
    const site = await Site.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (site === 0) { return res.status(404).json({failed: 'No segment matching this ID - Nothing deleted'}); }
    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json(error);
  }
};
