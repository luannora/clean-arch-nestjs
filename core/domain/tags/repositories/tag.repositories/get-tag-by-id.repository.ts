import { ITag } from '../../entities/tags.entity';

export interface IGetTagByIdRepository {
  execute(tagId: string): Promise<ITag>;
}
