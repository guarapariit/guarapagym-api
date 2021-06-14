import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';

interface IRequest {
  id: string;
  name: string;
}

class UpdateCategoryService {
  private categoriesRepository = getRepository(Category);

  public async execute({ id, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new AppError('Category does not exist.');
    }

    const checkCategoryWithNameExists = await this.categoriesRepository.findOne(
      {
        where: {
          name,
        },
      },
    );

    if (checkCategoryWithNameExists) {
      throw new AppError('Category already exists.');
    }

    category.name = name;

    await this.categoriesRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
