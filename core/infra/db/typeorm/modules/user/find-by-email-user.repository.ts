import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { IUser } from '@domain/user/entities/user.entity';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IFindByEmailUserRepository } from '@domain/user/repositories/find-by-email-user.repository';

export class FindByEmailUserRepository implements IFindByEmailUserRepository {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  execute(email: string): Promise<IUser> {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.email = :email', {
        email: email,
      })
      .getOne();
  }
}
