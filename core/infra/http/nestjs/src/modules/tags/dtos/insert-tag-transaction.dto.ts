import { IInsertTagTransactionDTO } from '@domain/tags/dtos/insert-tag-transaction-dto';
import { IDispute } from '@domain/tags/entities/dispute.entity';
import { ITag } from '@domain/tags/entities/tags.entity';
import { ApiProperty } from '@nestjs/swagger';

export class InsertTagTransactionDTO implements IInsertTagTransactionDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  transactionId: string;

  @ApiProperty()
  transactionOriginId: string;

  @ApiProperty()
  postingDate: Date | null;

  @ApiProperty()
  transactionTypeCode: string;

  @ApiProperty()
  transactionDate: Date | null;

  @ApiProperty()
  creditEntry: boolean;

  @ApiProperty()
  summary: string | null;

  @ApiProperty()
  paymentInstrumentType: string | null;

  @ApiProperty()
  paymentInstrumentTypeCode: number | null;

  @ApiProperty()
  paymentInstrument: string | null;

  @ApiProperty()
  tag: ITag | null;

  @ApiProperty()
  amount: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  disputes: IDispute[];
}