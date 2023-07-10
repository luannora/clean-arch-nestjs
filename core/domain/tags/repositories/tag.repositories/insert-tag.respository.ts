import { ITag } from '../../entities/tags.entity';

export interface IInsertTagRepository {
  execute(insertDTO: ITag): Promise<ITag>;
}
