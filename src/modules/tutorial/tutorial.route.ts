import express from 'express';
import { tutorialController } from './tutorial.controller';
import { protect } from '../../middlewares/authenticationMiddleawre';
import { authorize } from '../../middlewares/authorizationMiddleware';

const router = express.Router();

router.post('/', protect, authorize("admin") ,tutorialController.addTutorial);
router.get('/', tutorialController.getAllTutorials);
router.get('/:tutoId', tutorialController.getTutorialById);
router.patch('/:tutoId', protect, authorize("admin"), tutorialController.updateTutorial);
router.delete('/:tutoId', protect, authorize("admin"), tutorialController.softDeleteTutorial);

export const tutorialRoutes = router;