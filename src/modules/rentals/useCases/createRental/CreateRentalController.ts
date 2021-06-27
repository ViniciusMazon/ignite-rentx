/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const { id } = request.user;
    const createRentalsCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalsCase.execute({
      car_id,
      user_id: id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
