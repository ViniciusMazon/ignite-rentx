import { CategoriesRepository } from '../../repositories/CategoriesRepository.repository';
import { ListCategoriesController } from './ListCategoriesController.controller';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
