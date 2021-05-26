import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a user that does not exist', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'erro@error.com',
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '00012345',
        email: 'user1@test.com',
        password: '1234',
        name: 'User Test1',
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'Incorrect password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate incorrect email', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123456',
        email: 'user2@test.com',
        password: '1234',
        name: 'User Test2',
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: 'Incorrect email',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
