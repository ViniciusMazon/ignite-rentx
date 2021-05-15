import { Category } from '../../model/Category.model';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository.repository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
