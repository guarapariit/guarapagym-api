import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserByRoleService from '../services/ListUserByRoleService';

export default class TeachersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, phone, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      role: 1,
      password,
    });

    const { ...newUser } = classToClass(user);

    return response.json({ user: newUser });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const listUserByRole = new ListUserByRoleService();

    const users = (await listUserByRole.execute({ role: 1 })).map(user =>
      classToClass(user),
    );

    return response.json(users);
  }
}
