import { Router } from 'express';

import TrainingsController from '../controllers/TrainingsController';

const trainingsRouter = Router();
const trainingsController = new TrainingsController();

// trainingsRouter.get('/', trainingsController.show);
trainingsRouter.post('/', trainingsController.create);
// trainingsRouter.delete('/:id', trainingsController.delete);

export default trainingsRouter;
