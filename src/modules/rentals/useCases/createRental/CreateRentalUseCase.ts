/* eslint-disable camelcase */
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/date/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );
    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const compare = this.dateProvider.compareInHours(
      expected_return_date,
      this.dateProvider.now(),
    );
    const minimumRequiredHours = 24;
    if (compare < minimumRequiredHours) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
