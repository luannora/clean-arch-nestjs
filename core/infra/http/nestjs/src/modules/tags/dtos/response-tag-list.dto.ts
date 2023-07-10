import { ITag } from '@domain/tags/entities/tags.entity';
import { IPaginationResponse } from '../../../_shared/dtos/paginate-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTagListDTO implements IPaginationResponse<ITag>{
  @ApiProperty()
  data: ITag[];

  @ApiProperty()
  length: number;

}