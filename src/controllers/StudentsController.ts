import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserByRoleService from '../services/ListUserByRoleService';
import UpdateUserService from '../services/UpdateUserService';

export default class StudentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, phone, password, days, instructor_id } =
      request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      role: 0,
      password,
      days,
      instructor_id,
    });

    return response.json({ user: classToClass(user) });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const listUserByRole = new ListUserByRoleService();

    const users = (await listUserByRole.execute({ role: 0 })).map(user =>
      classToClass(user),
    );

    return response.json(users);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, cpf, phone, days, instructor_id } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      name,
      cpf,
      phone,
      role: 0,
      days,
      instructor_id,
    });

    return response.json(classToClass(user));
  }
}
