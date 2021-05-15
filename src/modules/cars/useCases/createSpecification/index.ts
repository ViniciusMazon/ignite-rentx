import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository.repository';
import { CreateSpecificationController } from './CreateSpecificationController.controller';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRepository = new SpecificationsRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
