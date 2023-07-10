import { IDispute } from '../entities/dispute.entity';
import { ITag } from '../entities/tags.entity';

export interface IInsertTagTransactionDTO {
  id: string;
  transactionId: string;
  transactionOriginId: string;
  postingDate: Date | null;
  transactionTypeCode: string;
  transactionDate: Date | null;
  creditEntry: boolean;
  summary: string | null;
  paymentInstrumentType: string | null;
  paymentInstrumentTypeCode: number | null;
  paymentInstrument: string | null;
  tag?: ITag | null;
  amount: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  disputes: IDispute[];
}