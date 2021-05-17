import AppError from 'errors/AppError';
import { Request, Response, NextFunction } from 'express';
import UsersRepository from 'repositories/UsersRepository';

export default async function ensureTeacher(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(request.user.id);

  if (!user) {
    return;
  }

  if (user.role >= 1) {
    next();
  } else {
    throw new AppError('User must be a teacher.', 401);
  }
}
