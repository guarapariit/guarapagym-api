import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import User from '../models/User';

interface IRequest {
  instructor_id: string;
}

type IResponse = Array<User>;

class ListInstructorStudentsService {
  private usersRepository = new UsersRepository();

  public async execute({ instructor_id }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.findInstructorStudents({
      instructor_id,
    });

    return users;
  }
}

export default ListInstructorStudentsService;
