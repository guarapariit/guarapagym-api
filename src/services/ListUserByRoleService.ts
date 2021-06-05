import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  role: number;
}

type IResponse = Array<User>;

class ListUserByRoleService {
  private usersRepository = new UsersRepository();

  public async execute({ role }: IRequest): Promise<IResponse> {
    if (role > 2 || role < 0) {
      throw new AppError('Role must be between 0 and 2, inclusive.');
    }

    const users = await this.usersRepository.findAll({ user_role: role });

    return users;
  }
}

export default ListUserByRoleService;
