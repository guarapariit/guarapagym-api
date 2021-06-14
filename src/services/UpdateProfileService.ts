import { hash, compare } from 'bcryptjs';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  user_id: string;
  old_password?: string;
  password?: string;
}

class UpdateProfileService {
  private usersRepository = new UsersRepository();

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
