import { ITag } from '../../entities/tags.entity';

export interface IUpdateTagRepository {
  execute(updateDTO: ITag): Promise<ITag>;
}
