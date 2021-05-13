import { Router } from 'express';
import { CategoriesRepository } from '../repositories/categoriesRepository.repository';
import { CreateCategoryService } from '../services/CreateCategoryService.service';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });
  return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();
  return response.status(200).json(all);
});

export { categoriesRoutes };
