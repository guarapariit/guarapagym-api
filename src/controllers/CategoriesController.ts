import { Request, Response } from 'express';
import DeleteCategoryService from '../services/DeleteCategoryService';
import CreateCategoryService from '../services/CreateCategoryService';

import ListCategoriesService from '../services/ListCategoriesService';

export default class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({ name });

    return response.json(category);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const listCategories = new ListCategoriesService();

    const categories = await listCategories.execute();

    return response.json(categories);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();

    await deleteCategory.execute({ id });

    return response.send();
  }
}
