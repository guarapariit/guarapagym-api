import { Router } from 'express';
import studentsRouter from './students.routes';
import instructorsRouter from './instructors.routes';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/instructors', instructorsRouter);

export default routes;
