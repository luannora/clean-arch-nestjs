import { ApiProperty } from '@nestjs/swagger';

export class PlanSimulateDTO {
  @ApiProperty()
  loadValue: number;
}
