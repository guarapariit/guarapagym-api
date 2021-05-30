import { Request, Response, NextFunction } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

export default async function ensureManager(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(request.user.id);

  if (!user) {
    return;
  }

  if (user.role >= 2) {
    next();
  } else {
    throw new AppError('User must be a manager.', 401);
  }
}
