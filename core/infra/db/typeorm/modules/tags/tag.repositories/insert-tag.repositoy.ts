import { ITag } from '@domain/tags/entities/tags.entity';
import { IInsertTagRepository } from '@domain/tags/repositories/tag.repositories/insert-tag.respository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class InsertTagRepository implements IInsertTagRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(insertDTO: ITag): Promise<ITag> {
    const tagId = (await this.tagRepo.save(insertDTO)).id;
    return this.tagRepo.findOne({
      where: { id: tagId },
    });
  }
}
