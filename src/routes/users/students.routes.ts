import { Router } from 'express';
import ensureManager from '../../middlewares/ensureManager';

import StudentsController from '../../controllers/StudentsController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const studentsController = new StudentsController();
const studentsRouter = Router();

studentsRouter.post(
  '/',
  ensureAuthenticated,
  ensureManager,
  studentsController.create,
);

export default studentsRouter;
