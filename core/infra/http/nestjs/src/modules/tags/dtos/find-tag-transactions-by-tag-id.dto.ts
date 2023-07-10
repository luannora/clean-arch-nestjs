import { ApiProperty } from '@nestjs/swagger';
import { PaginateDTO } from '../../../_shared/dtos/paginate.dto';
import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto';

export class FindTagTransactionsByTagIdDTO extends PaginateDTO implements IRequestFindTagTransactionByTagIdDTO {
  @ApiProperty({ required: false })
  created_at?: Date;
}