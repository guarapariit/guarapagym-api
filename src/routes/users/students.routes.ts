import { Router } from 'express';
import ensureInstructor from '../../middlewares/ensureInstructor';
import ensureManager from '../../middlewares/ensureManager';

import StudentsController from '../../controllers/StudentsController';
import InstructorStudentsController from '../../controllers/InstructorStudentsController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const studentsController = new StudentsController();
const instructorStudentsController = new InstructorStudentsController();
const studentsRouter = Router();

studentsRouter.post(
  '/',
  ensureAuthenticated,
  ensureManager,
  studentsController.create,
);

studentsRouter.get(
  '/',
  ensureAuthenticated,
  ensureManager,
  studentsController.show,
);

studentsRouter.get(
  '/me',
  ensureAuthenticated,
  ensureInstructor,
  instructorStudentsController.show,
);

studentsRouter.put(
  '/',
  ensureAuthenticated,
  ensureManager,
  studentsController.update,
);

export default studentsRouter;
