import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserByRoleService from '../services/ListUserByRoleService';
import UpdateUserService from '../services/UpdateUserService';
import ShowUserService from '../services/ShowUserService';

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

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = new ShowUserService();

    const user = await showUser.execute({ id });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, cpf, phone } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      name,
      cpf,
      phone,
      role: 1,
    });

    return response.json(classToClass(user));
  }
}
