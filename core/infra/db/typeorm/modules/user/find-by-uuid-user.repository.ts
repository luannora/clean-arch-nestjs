import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { IUser } from '@domain/user/entities/user.entity';
import { IFindByUUIDUserRepository } from '@domain/user/repositories/find-by-uuid-user.repository';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';

export class FindByUUIDUserRepository implements IFindByUUIDUserRepository {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  execute(id: string): Promise<IUser> {
    return this.userRepo.findOne({ where: { id } });
  }
}
