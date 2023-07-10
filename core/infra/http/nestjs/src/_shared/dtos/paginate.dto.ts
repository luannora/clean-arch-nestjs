import { IPaginate } from '@domain/_protocols/dtos/paginate.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateDTO implements IPaginate {
  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  orderBy?: string;

  @ApiPropertyOptional()
  orderDirection?: string;
}
