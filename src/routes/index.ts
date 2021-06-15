import { Router } from 'express';
import usersRouter from './users';
import sessionsRouter from './sessions.routes';
import profileRouter from './profile.routes';

import categoriesRouter from './categories.routes';
import exercisesRouter from './exercises.routes';
import trainingsRouter from './trainings.routes';

const routes = Router();

routes.use('/', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/categories', categoriesRouter);
routes.use('/exercises', exercisesRouter);
routes.use('/trainings', trainingsRouter);

export default routes;
