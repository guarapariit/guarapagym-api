import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  role: 0 | 1 | 2;
  days?: number[];
  instructor_id?: string;
}

class UpdateUserService {
  private usersRepository = new UsersRepository();

  public async execute({
    id,
    name,
    cpf,
    phone,
    role,
    days = [],
    instructor_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkUserCpfExists = await this.usersRepository.findByCpf(cpf);

    if (checkUserCpfExists && checkUserCpfExists.id !== id) {
      throw new AppError('CPF already used.');
    }

    if (role === 0) {
      // User is student
      if (days.length <= 0) {
        throw new AppError("Students must have the 'days' array.");
      }
      if (!instructor_id) {
        throw new AppError('Students must be assigned to an instructor.');
      } else {
        const checkInstructorExists = await this.usersRepository.findById(
          instructor_id,
        );
        if (!checkInstructorExists) {
          throw new AppError('Instructor does not exist.');
        }
      }
      user.days = days;
      user.instructor_id = instructor_id;
    }
    user.name = name ?? user.name;
    user.cpf = cpf ?? user.cpf;
    user.phone = phone ?? user.phone;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
