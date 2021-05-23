/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      'd41d8cd98f00b204e9800998ecf8427e',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch (err) {
    throw new Error('Invalid token');
  }
}
