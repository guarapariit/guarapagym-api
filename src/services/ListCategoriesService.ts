import { getRepository } from 'typeorm';

import Category from '../models/Category';

type IResponse = Array<Category>;

class ListCategoriesService {
  private categoriesRepository = getRepository(Category);

  public async execute(): Promise<IResponse> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesService;
