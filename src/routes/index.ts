import { Router } from 'express';
import usersRouter from './users';
import sessionsRouter from './sessions.routes';
import profileRouter from './profile.routes';

const routes = Router();

routes.use('/', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
