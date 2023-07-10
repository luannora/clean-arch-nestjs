import { ITagTransaction } from './tagTransaction.entity';
export interface IDispute {
  id: string;
  disputedTransactionChainId: string;
  transactionAmount: number | null;
  disputeId: string;
  openDate: Date | null;
  referenceIdentifier: string;
  requestDate: Date | null;
  requestReasonCode: number | null;
  requestReason: string;
  requestDescription: string;
  category: number | null;
  categoryName: string;
  amount: number | null;
  processStatus: string;
  resultStatus: string;
  merchantInformationDate: Date | null;
  responseDate: Date | null;
  responseDescription: string;
  refundTransactionId: string;
  refundAmount: number | null;
  correctionTransactionId: string;
  correctionAmount: number | null;
  tagTransaction: ITagTransaction | null;
}
