import { Router } from 'express';
import ensureInstructor from '../../middlewares/ensureInstructor';

import StudentsTrainingsController from '../../controllers/StudentsTrainingsController';
import StudentTrainingsController from '../../controllers/StudentTrainingsController';

const studentTrainingsRouter = Router();
const studentsTrainingsController = new StudentsTrainingsController();
const studentTrainingsController = new StudentTrainingsController();

studentTrainingsRouter.get('/trainings/me', studentTrainingsController.show);
studentTrainingsRouter.use(ensureInstructor);

studentTrainingsRouter.get('/:id/trainings', studentsTrainingsController.show);
studentTrainingsRouter.post(
  '/:id/trainings',
  studentsTrainingsController.create,
);
studentTrainingsRouter.get(
  '/:studentId/trainings/:id',
  studentsTrainingsController.index,
);
studentTrainingsRouter.put(
  '/:studentId/trainings/:id',
  studentsTrainingsController.update,
);
studentTrainingsRouter.delete(
  '/:studentId/trainings/:id',
  studentsTrainingsController.delete,
);

export default studentTrainingsRouter;
