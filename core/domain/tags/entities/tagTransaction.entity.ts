import { IDispute } from './dispute.entity';
import { ITag } from './tags.entity';

export interface ITagTransaction {
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
