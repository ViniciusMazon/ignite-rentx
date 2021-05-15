import { Category } from '../../model/Category.model';
import { ICategoriesRepository } from '../../repositories/interfaces/ICategoriesRepository.repository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
