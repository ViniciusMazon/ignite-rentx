import { Category } from '../model/category.model';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './interfaces/ICategoriesRepository.repository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category {
    const category = this.categories.find(item => item.name === name);
    return category;
  }
}

export { CategoriesRepository };
