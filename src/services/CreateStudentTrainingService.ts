import { getRepository } from 'typeorm';

import UsersRepository from 'repositories/UsersRepository';
import Exercise from 'models/Exercise';
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
  private usersRepository = new UsersRepository();

  private exercisesRepository = getRepository(Exercise);

  private sequenciesRepository = getRepository(Sequency);

  private trainingsRepository = new TrainingsRepository();

  public async execute({
    days,
    instructor_id,
    sequencies,
    student_id,
  }: IRequest): Promise<Training> {
    const checkInstructorExists = await this.usersRepository.findById(
      instructor_id,
    );

    if (!checkInstructorExists) {
      throw new AppError('Instructor does not exist.');
    }
    const checkStudentExists = await this.usersRepository.findById(student_id);

    if (!checkStudentExists) {
      throw new AppError('Student does not exist.');
    }

    // const checkIfSequencyHaventExercise = sequencies.filter(
    //   sequency => !sequency.id,
    // );

    // if (checkIfSequencyHaventExercise.length > 0) {
    //   throw new AppError('Please provide an exercise to all sequencies.');
    // }

    const auxExerciseId = sequencies.map(sequency => sequency.exercise_id);

    const checkExerciseExists = await this.exercisesRepository.findByIds(
      auxExerciseId,
    );

    if (!checkExerciseExists.length) {
      throw new AppError('Exercise does not exist.');
    }

    const existentExercisesIds = checkExerciseExists.map(
      exercise => exercise.id,
    );

    const checkInexistentExercisesIds = auxExerciseId.filter(
      exerciseId => !existentExercisesIds.includes(exerciseId),
    );

    if (checkInexistentExercisesIds.length) {
      throw new AppError(
        `Exercise ${checkInexistentExercisesIds[0]} does not exist.`,
      );
    }

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
