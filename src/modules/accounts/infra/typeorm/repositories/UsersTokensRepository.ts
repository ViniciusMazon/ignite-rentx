import { ICreateUserTokenDTO } from "@modules/accounts/dto/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { getRepository, Repository } from "typeorm";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor(){
    this.repository = getRepository(UserTokens);
  }

 async  create({ user_id, expires_date, refresh_token, }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });

    await this.repository.save(userToken);

    return userToken;
  }

}

export {UsersTokensRepository}