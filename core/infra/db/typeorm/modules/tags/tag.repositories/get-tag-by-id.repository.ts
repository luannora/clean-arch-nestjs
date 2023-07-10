import { ITag } from '@domain/tags/entities/tags.entity';
import { IGetTagByIdRepository } from '@domain/tags/repositories/tag.repositories/get-tag-by-id.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class GetTagByIdRepository
  implements IGetTagByIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(tagId: string): Promise<ITag> {
    let tag = await this.tagRepo.findOne({ where: { id: tagId } })
    return tag;
  }
}
