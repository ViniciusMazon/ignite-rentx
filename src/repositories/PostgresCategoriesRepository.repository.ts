import { Category } from '../model/Category.model';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './interfaces/ICategoriesRepository.repository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    return null;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}

export { PostgresCategoriesRepository };
