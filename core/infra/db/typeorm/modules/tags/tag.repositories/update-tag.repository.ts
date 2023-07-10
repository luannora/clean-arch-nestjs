import { ITag } from '@domain/tags/entities/tags.entity';
import { IUpdateTagRepository } from '@domain/tags/repositories/tag.repositories/update-tag-repository';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export class UpdateTagRepository implements IUpdateTagRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(insertDTO: ITag): Promise<ITag> {
    if (!insertDTO.id) return null;
    const { affected } = await this.tagRepo.update(insertDTO.id, insertDTO);
    if (affected === 0) return null;
    return this.tagRepo.findOne({ where: { id: insertDTO.id } });
  }
}
