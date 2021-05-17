import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

export default class StudentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, phone, password, days } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      role: 0,
      password,
      days,
    });

    return response.json(user);
  }
}
