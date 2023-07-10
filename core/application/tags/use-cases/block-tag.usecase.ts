import { IGreenpassAdapter } from '@domain/adapters/greenpass-adapter/greenpass-adapter';
import { TagStatusEnum } from '@domain/tags/entities/tags.entity';
import { IGetTagByIdRepository } from '@domain/tags/repositories/tag.repositories/get-tag-by-id.repository';
import { IUpdateTagRepository } from '@domain/tags/repositories/tag.repositories/update-tag-repository';
import { IBlockTagUseCase } from '@domain/tags/use-cases/block-tag.usecase';
import { BadRequestException } from '@nestjs/common';

export class BlockTagUseCase implements IBlockTagUseCase {
  constructor(
    private readonly getTagByIdRepo: IGetTagByIdRepository,
    private readonly greenPassAdapter: IGreenpassAdapter,
    private readonly updateTagRepo: IUpdateTagRepository,
  ) {}

  async execute(tagId: string): Promise<boolean> {
    const tag = await this.getTagByIdRepo.execute(tagId);

    if (!tag) {
      throw new BadRequestException('Tag não encontrada');
    }

    let result = await this.greenPassAdapter.blockTag(tag.tagNumber);

    if (result) {
      if (result.nsu) {
        tag.tagStatus = TagStatusEnum.Blocked;
        await this.updateTagRepo.execute(tag);
        return true;
      }
    }

    return false;
  }
}
