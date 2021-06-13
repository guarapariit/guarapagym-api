import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ListInstructorStudentsService from '../services/ListInstructorStudentsService';

export default class InstructorStudentsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listInstructorStudents = new ListInstructorStudentsService();

    const users = (
      await listInstructorStudents.execute({ instructor_id: id })
    ).map(user => classToClass(user));

    return response.json(users);
  }
}
