import { PaginateDTO } from '@infra/http/nestjs/src/_shared/dtos/paginate.dto';

export interface IRequestFindTagTransactionByTagIdDTO extends PaginateDTO {
  created_at?: Date
}