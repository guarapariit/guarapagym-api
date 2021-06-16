import TrainingsRepository from '../repositories/TrainingsRepository';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import Training from '../models/Training';

interface IRequest {
  id: string;
}

type IResponse = Array<Training>;

class ListStudentTrainingsService {
  private usersRepository = new UsersRepository();

  private trainingsRepository = new TrainingsRepository();

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Student does not exist.');
    }

    if (user.role !== 0) {
      throw new AppError('User is not a student.');
    }

    const trainings = await this.trainingsRepository.findAllByStudentId(id);

    return trainings;
  }
}

export default ListStudentTrainingsService;
