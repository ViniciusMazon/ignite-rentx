import { Router } from 'express';
import { CategoriesRepository } from '../repositories/categoriesRepository.repository'

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();
  return response.status(200).json(all);
})

export { categoriesRoutes };
