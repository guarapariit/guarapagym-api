import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';

interface IRequest {
  id: string;
}

class DeleteCategoryService {
  private categoriesRepository = getRepository(Category);

  public async execute({ id }: IRequest): Promise<void> {
    const checkCategoryExists = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!checkCategoryExists) {
      throw new AppError('Category does not exist.');
    }

    await this.categoriesRepository.remove(checkCategoryExists);
  }
}

export default DeleteCategoryService;
