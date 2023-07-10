import { IImportTagsResultDTO } from '@domain/tags/dtos/import-tags-result.dto';
import { ITag } from '@domain/tags/entities/tags.entity';
import { IFindByTagNumberRepository } from '@domain/tags/repositories/tag.repositories/find-by-tag-number.repository';
import { IInsertTagRepository } from '@domain/tags/repositories/tag.repositories/insert-tag.respository';
import { IImportTagsUseCase } from '@domain/tags/use-cases/import-tags.usecase';

export class ImportTagsUseCase implements IImportTagsUseCase {
  constructor(
    private readonly insertTagRepo: IInsertTagRepository,
    private readonly findByTagNumberRepo: IFindByTagNumberRepository,
  ) { }

  async execute(tags: ITag[]): Promise<IImportTagsResultDTO> {
    let tagsInserted = 0;
    let tagsNInserted = 0;

    for (let index = 0; index < tags.length; index++) {
      const tagToInsert = tags[index];

      const tagExists = await this.findByTagNumberRepo.execute(
        tagToInsert.tagNumber,
      );

      if (tagExists) {
        tagsNInserted++;
      } else {
        const tagResult = await this.insertTagRepo.execute(tagToInsert);
        tagsInserted++;
      }
    }

    return { tagsInserted, tagsNInserted };
  }
}
