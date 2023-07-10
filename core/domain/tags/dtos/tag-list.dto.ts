import { PaginateDTO } from '@infra/http/nestjs/src/_shared/dtos/paginate.dto';

export interface IRequestListTagsDTO extends PaginateDTO {
  tagid?: string;
  plate?: string;
  nickName?: string;
  status?: string;
}