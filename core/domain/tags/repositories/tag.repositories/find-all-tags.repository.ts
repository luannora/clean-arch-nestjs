import { ITag } from '../../entities/tags.entity';

export interface IFindAllTagsRepository {
  execute(): Promise<ITag[]>;
}
