import { ITag } from '@domain/tags/entities/tags.entity';
import { IFindByTagNumberRepository as IFindByTagNumberRepository } from '@domain/tags/repositories/tag.repositories/find-by-tag-number.repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindByTagNumberRepository
  implements IFindByTagNumberRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(tagNumber: string): Promise<ITag> {
    let tag = await this.tagRepo.findOne({ where: { tagNumber: tagNumber } })
    return tag;
  }
}
