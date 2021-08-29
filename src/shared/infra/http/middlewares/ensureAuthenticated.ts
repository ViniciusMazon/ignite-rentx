import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';
import { AppError } from '../../../errors/AppError';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const userTokensRepository = new UsersTokensRepository();

  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );
    if (!user) {
      throw new AppError('User does not exists', 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
