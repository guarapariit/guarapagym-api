import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.show);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
