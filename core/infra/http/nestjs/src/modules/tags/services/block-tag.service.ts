import { IBlockTagUseCase } from '@domain/tags/use-cases/block-tag.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockTagService {
  constructor(private readonly blockTagUseCase: IBlockTagUseCase) {}

  async execute(tagId: string) {
    return await this.blockTagUseCase.execute(tagId);
  }
}
