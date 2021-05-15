import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository.repository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService.service';

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );
  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };
