import { Inject } from '@nestjs/common';
import { IUser } from '@domain/user/entities/user.entity';
import { IInsertUserRepository } from '@domain/user/repositories/insert-user.repository';
import { RepositoryProxyModule } from 'core/infra/http/nestjs/src/proxy/repository.proxy.module';
import { Repository } from 'typeorm';

export class InsertUserRepository implements IInsertUserRepository {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  async execute(userDTO: IUser): Promise<IUser> {
    const userId = (await this.userRepo.save(userDTO)).id;
    return this.userRepo.findOne({
      where: { id: userId },
    });
  }
}
