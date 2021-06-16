import { Router } from 'express';
import ensureInstructor from '../../middlewares/ensureInstructor';

import StudentTrainingsController from '../../controllers/StudentTrainingsController';

const studentTrainingsRouter = Router();
const studentTrainingsController = new StudentTrainingsController();

studentTrainingsRouter.use(ensureInstructor);

studentTrainingsRouter.get('/:id/trainings', studentTrainingsController.show);
studentTrainingsRouter.post(
  '/:id/trainings',
  studentTrainingsController.create,
);
studentTrainingsRouter.get(
  '/:studentId/trainings/:id',
  studentTrainingsController.index,
);
studentTrainingsRouter.put(
  '/:studentId/trainings/:id',
  studentTrainingsController.update,
);
studentTrainingsRouter.delete(
  '/:studentId/trainings/:id',
  studentTrainingsController.delete,
);

export default studentTrainingsRouter;
