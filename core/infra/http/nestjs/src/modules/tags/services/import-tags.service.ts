import { ITag } from '@domain/tags/entities/tags.entity';
import { IImportTagsUseCase } from '@domain/tags/use-cases/import-tags.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImportTagsService {
  constructor(private readonly importTagsUseCase: IImportTagsUseCase) {}

  async execute(data: ITag[]) {
    return await this.importTagsUseCase.execute(data);
  }
}
