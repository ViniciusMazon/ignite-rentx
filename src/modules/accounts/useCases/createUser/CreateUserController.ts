import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(request.body);
    return response.status(201).send();
  }
}

export { CreateUserController };
