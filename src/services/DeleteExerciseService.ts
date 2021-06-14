import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Exercise from '../models/Exercise';

interface IRequest {
  id: string;
}

class DeleteExerciseService {
  private exercisesRepository = getRepository(Exercise);

  public async execute({ id }: IRequest): Promise<void> {
    const checkExerciseExists = await this.exercisesRepository.findOne({
      where: {
        id,
      },
    });

    if (!checkExerciseExists) {
      throw new AppError('Exercise does not exist.');
    }

    await this.exercisesRepository.remove(checkExerciseExists);
  }
}

export default DeleteExerciseService;
