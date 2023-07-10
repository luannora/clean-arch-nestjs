import { MoveTypeEnum } from '../entities/account_versions.entity';

export interface IMovementAccountDto {
  accountId: string;
  value: number;
  moveType: MoveTypeEnum;
  tableName: string;
  tableId: string;
}
