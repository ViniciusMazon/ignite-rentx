/* eslint-disable camelcase */
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { User } from '../../infra/typeorm/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const { driver_license, email, name, password } = data;
    const user = new User();
    Object.assign(user, { driver_license, email, name, password });
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(item => item.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(item => item.id === id);
  }
}

export { UsersRepositoryInMemory };
