import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TrainingsRepository from '../repositories/TrainingsRepository';
import Training from '../models/Training';
import Sequency from '../models/Sequency';

interface IRequest {
  student_id: string;
  instructor_id: string;
  sequencies: Sequency[];
  days: number[];
}

class CreateTrainingService {
  private sequenciesRepository = getRepository(Sequency);

  private trainingsRepository = new TrainingsRepository();

  public async execute({
    days,
    instructor_id,
    sequencies,
    student_id,
  }: IRequest): Promise<Training> {
    const parsedSequencies = sequencies.map(sequency =>
      this.sequenciesRepository.create(sequency),
    );

    await this.sequenciesRepository.save(parsedSequencies);

    const serializedSequencies = parsedSequencies.map(sequency => ({
      sequency_id: sequency.id,
    }));

    const training = await this.trainingsRepository.create({
      days,
      instructor_id,
      sequencies: serializedSequencies,
      student_id,
    });

    return training;
  }
}

export default CreateTrainingService;
