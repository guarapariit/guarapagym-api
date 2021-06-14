import { getRepository } from 'typeorm';

import Exercise from '../models/Exercise';

type IResponse = Array<Exercise>;

class ListExercisesService {
  private exercisesRepository = getRepository(Exercise);

  public async execute(): Promise<IResponse> {
    const exercises = await this.exercisesRepository.find();

    return exercises;
  }
}

export default ListExercisesService;
