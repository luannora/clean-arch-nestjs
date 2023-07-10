import { Inject } from '@nestjs/common';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { IAccount } from '@domain/account/entities/account.entity';
import { IGetAccountByUserIdRepository } from '@domain/account/repositories/get-account-by-user-id.repository';
import { IUser } from '@domain/user/entities/user.entity';

export class GetAccountByUserIdRepository
  implements IGetAccountByUserIdRepository
{
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  async execute(userId: string): Promise<IAccount> {
    let user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.account', 'account')
      .where('user.id = :userId', {
        userId: userId,
      })
      .getOne();

    return user.account;
  }
}
