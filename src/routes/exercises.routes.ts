import { Router } from 'express';

import ExercisesController from '../controllers/ExercisesController';

const exercisesRouter = Router();
const exercisesController = new ExercisesController();

exercisesRouter.get('/', exercisesController.show);
exercisesRouter.post('/', exercisesController.create);
exercisesRouter.put('/:id', exercisesController.update);
exercisesRouter.delete('/:id', exercisesController.delete);

export default exercisesRouter;
