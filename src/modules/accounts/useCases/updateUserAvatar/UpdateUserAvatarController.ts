/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUserCase } from './UpdateUserAvatarUserCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUserCase);
    updateUserAvatarUseCase.execute({ user_id, avatar_file });
    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
