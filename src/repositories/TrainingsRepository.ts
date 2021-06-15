import { getRepository, Repository, Not } from 'typeorm';

import Training from '../models/Training';
import Sequency from '../models/Sequency';

interface SequencyDTO {
  id: string;
  sets: number;
  repetitions: number;
}

interface CreateTrainingDTO {
  student_id: string;
  instructor_id: string;
  sequencies: SequencyDTO[];
  days: number[];
}

class UsersRepository {
  private ormRepository: Repository<Training>;

  private sequenciesRepository: Repository<Sequency>;

  constructor() {
    this.ormRepository = getRepository(Training);
    this.sequenciesRepository = getRepository(Sequency);
  }

  public async findById(id: string): Promise<Training | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create({
    days,
    instructor_id,
    sequencies,
    student_id,
  }: CreateTrainingDTO): Promise<Training> {
    const parsedSequencies = sequencies.map(sequency =>
      this.sequenciesRepository.create(sequency),
    );

    await this.sequenciesRepository.save(parsedSequencies);

    const serializedSequencies = parsedSequencies.map(sequency => ({
      sequency_id: sequency.id,
    }));

    const training = this.ormRepository.create({
      days,
      instructor_id,
      trainings_sequencies: serializedSequencies,
      student_id,
    });

    await this.ormRepository.save(training);

    console.log(await this.ormRepository.findOne(training.id));

    return training;
  }

  public async save(training: Training): Promise<Training> {
    return this.ormRepository.save(training);
  }
}

export default UsersRepository;
