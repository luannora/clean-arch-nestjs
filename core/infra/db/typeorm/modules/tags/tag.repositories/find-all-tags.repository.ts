import { ITag } from '@domain/tags/entities/tags.entity';
import { IFindAllTagsRepository } from '@domain/tags/repositories/tag.repositories/find-all-tags.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindAllTagsRepository
  implements IFindAllTagsRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(): Promise<ITag[]> {
    let tags = await this.tagRepo.find()
    return tags;
  }
}
