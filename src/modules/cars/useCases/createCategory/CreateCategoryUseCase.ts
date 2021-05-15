import { ICategoriesRepository } from '../../repositories/interfaces/ICategoriesRepository.repository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category already existis');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
