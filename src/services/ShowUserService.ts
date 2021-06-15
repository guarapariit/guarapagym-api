import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  id: string;
}

class ShowUserService {
  private usersRepository = new UsersRepository();

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowUserService;
