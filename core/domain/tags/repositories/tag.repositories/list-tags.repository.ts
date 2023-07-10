import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { ITag } from '../../entities/tags.entity';
import { IPaginationResponse } from '@infra/http/nestjs/src/_shared/dtos/paginate-response.dto';

export interface IListTagsRepository {
  execute(req: any, filters: IRequestListTagsDTO): Promise<IPaginationResponse<ITag>>;
}