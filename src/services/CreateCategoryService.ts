import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';

interface IRequest {
  name: string;
}

class CreateCategoryService {
  private categoriesRepository = getRepository(Category);

  public async execute({ name }: IRequest): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findOne({
      where: {
        name,
      },
    });

    if (checkCategoryExists) {
      throw new AppError('Category already exists.');
    }

    const category = await this.categoriesRepository.save({
      name,
    });

    return category;
  }
}

export default CreateCategoryService;
