import { Router } from 'express';
import ensureInstructor from '../../middlewares/ensureInstructor';
import ensureManager from '../../middlewares/ensureManager';

import StudentsController from '../../controllers/StudentsController';
import InstructorStudentsController from '../../controllers/InstructorStudentsController';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import userTrainingsRouter from './student.trainings.routes';

const studentsController = new StudentsController();
const instructorStudentsController = new InstructorStudentsController();
const studentsRouter = Router();

studentsRouter.use(ensureAuthenticated);
studentsRouter.use('/', userTrainingsRouter);

studentsRouter.post('/', ensureManager, studentsController.create);

studentsRouter.get('/', ensureManager, studentsController.show);

studentsRouter.get('/me', ensureInstructor, instructorStudentsController.show);

studentsRouter.get('/:id', ensureManager, studentsController.index);

studentsRouter.put('/', ensureManager, studentsController.update);

export default studentsRouter;
