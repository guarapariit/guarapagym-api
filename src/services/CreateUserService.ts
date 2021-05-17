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
  days: number[];
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
    days,
  }: IRequest): Promise<User> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);
    const checkUserCpfExists = await this.usersRepository.findByCpf(cpf);

    if (checkUserEmailExists) {
      throw new AppError('Email address already used.');
    }
    if (checkUserCpfExists) {
      throw new AppError('CPF already used.');
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
    });

    return user;
  }
}

export default CreateUserService;
