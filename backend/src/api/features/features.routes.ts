import { Router } from 'express';
import { getFeatures } from './features.controller';

const router = Router();

router.route('/').get(getFeatures);

export default router;