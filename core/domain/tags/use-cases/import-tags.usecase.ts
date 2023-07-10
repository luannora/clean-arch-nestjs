import { IImportTagsResultDTO } from '../dtos/import-tags-result.dto';
import { ITag } from '../entities/tags.entity';

export interface IImportTagsUseCase {
  execute(tags: ITag[]): Promise<IImportTagsResultDTO>;
}
