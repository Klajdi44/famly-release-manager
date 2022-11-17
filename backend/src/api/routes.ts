import { Router } from 'express';
import TeamsRoutes from './teams/teams.routes';
import FeaturesRoutes from './features/features.routes';

const router = Router();

router.use('/teams', TeamsRoutes);
router.use('/features', FeaturesRoutes);

export default router;