import { Request, Response } from 'express';

import CreateExerciseService from '../services/CreateExerciseService';
import DeleteExerciseService from '../services/DeleteExerciseService';
import UpdateExerciseService from '../services/UpdateExerciseService';
import ListExercisesService from '../services/ListExercisesService';

export default class ExercisesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, video_url, category_id } = request.body;

    const createExercise = new CreateExerciseService();

    const exercise = await createExercise.execute({
      name,
      video_url,
      category_id,
    });

    return response.json(exercise);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, video_url } = request.body;

    const updateExercise = new UpdateExerciseService();

    const exercise = await updateExercise.execute({
      id,
      name,
      video_url,
    });

    return response.json(exercise);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const listExercises = new ListExercisesService();

    const exercises = await listExercises.execute();

    return response.json(exercises);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExercise = new DeleteExerciseService();

    await deleteExercise.execute({ id });

    return response.send();
  }
}
