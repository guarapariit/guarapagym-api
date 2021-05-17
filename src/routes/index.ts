import { Router } from 'express';
import usersRouter from './users';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
