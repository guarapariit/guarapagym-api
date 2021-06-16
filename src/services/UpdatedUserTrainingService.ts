import { getRepository } from 'typeorm';
import TrainingsRepository from '../repositories/TrainingsRepository';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import Training from '../models/Training';
import Sequency from '../models/Sequency';
import TrainingsSequencies from '../models/TrainingsSequencies';

interface IRequest {
  studentId: string;
  id: string;
  days: number[];
  sequencies: Sequency[];
}

class UpdateStudentTrainingService {
  private usersRepository = new UsersRepository();

  private sequenciesRepository = getRepository(Sequency);

  private trainingsSequenciesRepository = getRepository(TrainingsSequencies);

  private trainingsRepository = new TrainingsRepository();

  public async execute({
    studentId,
    id,
    days,
    sequencies,
  }: IRequest): Promise<Training> {
    const user = await this.usersRepository.findById(studentId);

    if (!user) {
      throw new AppError('Student does not exist.');
    }

    if (user.role !== 0) {
      throw new AppError('User is not a student.');
    }

    const training = await this.trainingsRepository.findById({
      id,
      studentId,
    });

    if (!training) {
      throw new AppError('Training does not exist on this student.');
    }

    if (sequencies.length > 0) {
      await this.trainingsSequenciesRepository.delete(
        training.trainings_sequencies.map(sequency => sequency.id),
      );

      const parsedSequencies = sequencies.map(sequency =>
        this.sequenciesRepository.create(sequency),
      );

      await this.sequenciesRepository.save(parsedSequencies);

      const trainingsSequencies = parsedSequencies.map(sequency => ({
        sequency_id: sequency.id,
        training_id: training.id,
      }));

      const saveTrainingsSequencies =
        await this.trainingsSequenciesRepository.save(trainingsSequencies);

      training.trainings_sequencies = saveTrainingsSequencies;
    }

    training.days = days.length > 0 ? days : training.days;

    await this.trainingsRepository.save(training);

    return training;
  }
}

export default UpdateStudentTrainingService;
