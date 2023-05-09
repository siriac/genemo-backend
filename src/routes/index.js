import { Router } from 'express';
import menuRoutes from './menu';
import moduleRoutes from './module';
import imeiRoutes from './imei';
import dataRoutes from './data';
import timeOfActivitieRoutes from './activities_duration/activities_duration';
import trameRoutes from './trame';
import vidangeRoutes from './vidange';
const router = Router();

router.use('/menu', menuRoutes);
router.use('/modules',moduleRoutes);
router.use('/trames',trameRoutes);
router.use('/vidanges',vidangeRoutes);
router.use('/imei',imeiRoutes);
router.use('/data',dataRoutes);
router.use('/timeOfActivities',timeOfActivitieRoutes);
export default router;
