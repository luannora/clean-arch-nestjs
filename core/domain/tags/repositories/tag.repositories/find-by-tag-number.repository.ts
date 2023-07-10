import { ITag } from '../../entities/tags.entity';

export interface IFindByTagNumberRepository {
  execute(tagNumber: string): Promise<ITag>;
}
