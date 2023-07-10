import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { IUser } from '@domain/user/entities/user.entity';
import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IFindByEmailOrDocumentUserRepository } from '@domain/user/repositories/find-by-email-or-document-user.repository';

export class FindByEmailOrDocumentUserRepository
  implements IFindByEmailOrDocumentUserRepository
{
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,
  ) {}

  execute(emailOrDocument: string): Promise<IUser> {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where(
        'user.email = :emailOrDocument or user.document = :emailOrDocument',
        {
          emailOrDocument: emailOrDocument,
        },
      )
      .getOne();
  }
}
