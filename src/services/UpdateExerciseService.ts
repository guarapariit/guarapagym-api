import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Exercise from '../models/Exercise';

interface IRequest {
  id: string;
  name: string;
  video_url: string;
}

class CreateExerciseService {
  private exercisesRepository = getRepository(Exercise);

  public async execute({ id, name, video_url }: IRequest): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne(id);

    if (!exercise) {
      throw new AppError('Exercise doest not exist.');
    }

    const checkExerciseNameInCategoryExists =
      await this.exercisesRepository.findOne({
        where: {
          name,
          category_id: exercise.category_id,
        },
      });

    if (checkExerciseNameInCategoryExists) {
      throw new AppError(
        "An exercise with this name already exists in it's category.",
      );
    }

    exercise.name = name;
    exercise.video_url = video_url;

    await this.exercisesRepository.save(exercise);

    return exercise;
  }
}

export default CreateExerciseService;
