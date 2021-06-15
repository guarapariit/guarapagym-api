import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TrainingsRepository from '../repositories/TrainingsRepository';
import Training from '../models/Training';

interface Sequency {
  id: string;
  sets: number;
  repetitions: number;
}

interface IRequest {
  student_id: string;
  instructor_id: string;
  sequencies: Sequency[];
  days: number[];
}

class CreateTrainingService {
  private trainingsRepository = new TrainingsRepository();

  public async execute({
    days,
    instructor_id,
    sequencies,
    student_id,
  }: IRequest): Promise<Training> {
    const training = await this.trainingsRepository.create({
      days,
      instructor_id,
      sequencies,
      student_id,
    });

    return training;
  }
}

export default CreateTrainingService;
