import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Exercise from '../models/Exercise';

interface IRequest {
  name: string;
  category_id: string;
  video_url: string;
}

class CreateExerciseService {
  private exercisesRepository = getRepository(Exercise);

  public async execute({
    name,
    category_id,
    video_url,
  }: IRequest): Promise<Exercise> {
    const checkExerciseExists = await this.exercisesRepository.findOne({
      where: {
        name,
        category_id,
      },
    });

    if (checkExerciseExists) {
      throw new AppError('Exercise already exists in this category.');
    }

    const exercise = await this.exercisesRepository.save({
      name,
      category_id,
      video_url,
    });

    return exercise;
  }
}

export default CreateExerciseService;
