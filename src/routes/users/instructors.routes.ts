import { Router } from 'express';
import ensureManager from '../../middlewares/ensureManager';

import InstructorsController from '../../controllers/InstructorsController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const instructorsController = new InstructorsController();
const instructorsRouter = Router();

instructorsRouter.post(
  '/',
  ensureAuthenticated,
  ensureManager,
  instructorsController.create,
);

export default instructorsRouter;