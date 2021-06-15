import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateTrainingService from '../services/CreateTrainingService';

// import ListTrainingsService from '../services/ListTrainingsService';

export default class CategoriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { days, instructor_id, sequencies, student_id } = request.body;

    const createTraining = new CreateTrainingService();

    const training = await createTraining.execute({
      days,
      instructor_id,
      sequencies,
      student_id,
    });
    return response.json(classToClass(training));
  }

  // async show(request: Request, response: Response): Promise<Response> {
  //   const listCategories = new ListCategoriesService();

  //   const categories = await listCategories.execute();

  //   return response.json(categories);
  // }

  // async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteCategory = new DeleteCategoryService();

  //   await deleteCategory.execute({ id });

  //   return response.send();
  // }
}
