import { IMovementAccountDto } from '@domain/account/dto/movement-account.dto';
import { MoveTypeEnum } from '@domain/account/entities/account_versions.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class MovementAccountDTO implements IMovementAccountDto {
  @ApiProperty()
  accountId: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  moveType: MoveTypeEnum;

  @ApiProperty()
  tableName: string;

  @ApiProperty()
  @IsUUID()
  tableId: string;
}
