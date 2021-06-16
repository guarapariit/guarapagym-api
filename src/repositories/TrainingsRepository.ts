import { getRepository, Repository } from 'typeorm';

import Training from '../models/Training';

interface SequencyDTO {
  sequency_id: string;
}

interface CreateTrainingDTO {
  student_id: string;
  instructor_id: string;
  sequencies: SequencyDTO[];
  days: number[];
}

interface FingTrainingDTO {
  id: string;
  studentId: string;
}

class TrainingsRepository {
  private ormRepository: Repository<Training>;

  constructor() {
    this.ormRepository = getRepository(Training);
  }

  public async findById({
    id,
    studentId,
  }: FingTrainingDTO): Promise<Training | undefined> {
    const trainings = await this.ormRepository.findOne({
      where: {
        id,
        studentId,
      },
    });

    return trainings;
  }

  public async findAllByStudentId(userId: string): Promise<Training[]> {
    const trainings = await this.ormRepository.find({
      where: {
        student_id: userId,
      },
    });

    return trainings;
  }

  public async create({
    days,
    instructor_id,
    sequencies,
    student_id,
  }: CreateTrainingDTO): Promise<Training> {
    const training = this.ormRepository.create({
      days,
      instructor_id,
      trainings_sequencies: sequencies,
      student_id,
    });

    await this.ormRepository.save(training);

    return training;
  }

  public async save(training: Training): Promise<Training> {
    return this.ormRepository.save(training);
  }

  public async delete(training: Training): Promise<void> {
    await this.ormRepository.delete(training);
  }
}

export default TrainingsRepository;
