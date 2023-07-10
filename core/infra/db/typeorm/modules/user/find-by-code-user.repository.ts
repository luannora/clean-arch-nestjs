import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { IUser } from '@domain/user/entities/user.entity';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IFindByCodeUserRepository } from '@domain/user/repositories/find-by-code-user.repository';

export class FindByCodeUserRepository implements IFindByCodeUserRepository {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  execute(code: string): Promise<IUser> {
    return this.userRepo.findOne({ where: { code } });
  }
}
