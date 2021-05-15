import { CategoriesRepository } from '../../repositories/CategoriesRepository.repository';
import { CreateCategoryController } from './CreateCategoryController.controller';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

export { createCategoryController };
