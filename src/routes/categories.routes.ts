import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository.repository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();
  return response.status(200).json(all);
});

export { categoriesRoutes };
