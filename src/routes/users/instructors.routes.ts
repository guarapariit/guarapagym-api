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

instructorsRouter.get(
  '/',
  ensureAuthenticated,
  ensureManager,
  instructorsController.show,
);

instructorsRouter.get(
  '/:id',
  ensureAuthenticated,
  ensureManager,
  instructorsController.index,
);

instructorsRouter.put(
  '/',
  ensureAuthenticated,
  ensureManager,
  instructorsController.update,
);

export default instructorsRouter;
