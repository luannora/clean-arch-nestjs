import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateDTO } from '../../../_shared/dtos/paginate.dto';

export class RequestListTagsDTO extends PaginateDTO implements IRequestListTagsDTO {
  @ApiProperty({ required: false })
  tagid?: string;

  @ApiProperty({ required: false })
  plate?: string;

  @ApiProperty({ required: false })
  nickName?: string;

  @ApiProperty({ required: false })
  status?: string;
}