import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: 0 | 1 | 2;
  password: string;
  days?: number[];
  instructor_id?: string;
}

class CreateUserService {
  private usersRepository = new UsersRepository();

  public async execute({
    name,
    email,
    cpf,
    phone,
    role,
    password,
    days = [],
    instructor_id,
  }: IRequest): Promise<User> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);
    const checkUserCpfExists = await this.usersRepository.findByCpf(cpf);

    if (checkUserEmailExists) {
      throw new AppError('Email address already used.');
    }
    if (checkUserCpfExists) {
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
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      phone,
      role,
      password: hashedPassword,
      days,
      instructor_id,
    });

    return user;
  }
}

export default CreateUserService;
