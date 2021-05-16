import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository.repository';
import { ImportCategoryController } from './ImportCategoryController.controller';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
