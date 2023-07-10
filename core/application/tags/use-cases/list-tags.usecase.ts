import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { ITag } from '@domain/tags/entities/tags.entity';
import { IListTagsRepository } from '@domain/tags/repositories/tag.repositories/list-tags.repository';
import { IListTagsUseCase } from '@domain/tags/use-cases/list-tags.usecase';
import { BadRequestException } from '@nestjs/common';

export class ListTagsUseCase implements IListTagsUseCase {
  constructor(
    private readonly listTagsRepo: IListTagsRepository,

  ) { }

  async execute(req: any, filtersDTO: IRequestListTagsDTO): Promise<any> {
    const tags = await this.listTagsRepo.execute(req, filtersDTO)

    if (!tags) {
      throw new BadRequestException("Tag não cadastrada")
    }
    return tags
  }
}
