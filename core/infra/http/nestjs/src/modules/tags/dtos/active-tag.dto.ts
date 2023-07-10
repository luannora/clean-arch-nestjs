import { IActiveTagDTO } from '@domain/tags/dtos/active-tag.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ActiveTagDTO implements IActiveTagDTO {
  @ApiProperty()
  vehicleId: string;
}
