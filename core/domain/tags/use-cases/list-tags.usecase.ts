import { IRequestListTagsDTO } from '../dtos/tag-list.dto';
import { ITag } from '../entities/tags.entity';


export interface IListTagsUseCase {
  execute(req: any, tagListDTO: IRequestListTagsDTO): Promise<any>;
}
