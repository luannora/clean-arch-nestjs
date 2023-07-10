export const GREENPASS_ADAPTER_INTERFACE = 'IGreenpassAdapter';

export interface IReturnGreenpass {
  nsu: string;
}

export interface IActivateTag {
  nsu: string;
  tag: any;
}

export interface IOpenDispute {
  disputedTransactionChainId: string;
  transactionAmount: number;
  disputeId: string;
  openDate: Date;
  referenceIdentifier: string;
  requestDate: Date;
  requestReasonCode: number;
  requestReason: string;
  requestDescription: number;
  category: number;
  categoryName: string;
  amount: number;
  processStatus: string;
  resultStatus: string;
  merchantInformationDate: Date;
  responseDate: Date;
  responseDescription: string;
  refundTransactionId: string;
  refundAmount: number;
  correctionTransactionId: string;
  correctionAmount: number;
  history: [{ date: Date; description: string; status: number }];
  slaInfo: { SlaDate: Date; FrozenUntilDate: Date };
  attachments: [string];
}
export interface ITagStatus {
  code: string;
  description: string;
}

export interface IActivateTagParams {
  tagNumber: string;
  licensePlate: string;
  categoryCode?: number;
}

export interface IGetTagParams {
  tagNumber: string;
}

export interface IReleaseTagParams {
  tagNumber: string;
  statusId: number;
}

export interface ICancelTagParams {
  tagNumber: string;
  statusId: number;
}

export interface IReplaceTagParams {
  tagNumber: string;
  newTagNumber: number;
}

export interface IOpenDisputeParams {
  transactionId: string;
  reason: string;
  description: string;
  referenceIdentifier: string;
  requestCategory: number;
  requestAmount: number;
}

export interface IGreenpassAdapter {
  blockTag: (tagNumber: string) => Promise<IReturnGreenpass>;
  activateTag: (data: IActivateTagParams) => Promise<any>;
  getTag: (data: IGetTagParams) => Promise<any>;
  releaseTag: (data: IReleaseTagParams) => Promise<IReturnGreenpass>;
  cancelTag: (data: ICancelTagParams) => Promise<IReturnGreenpass>;
  replaceTag: (data: IReplaceTagParams) => Promise<IReturnGreenpass>;
  openDispute: (data: IOpenDisputeParams) => Promise<IOpenDispute>;
  changeInvoiceGroupTag: (
    tagNumber: string,
    invoiceGroup: string,
  ) => Promise<IReturnGreenpass>;
  changeVehicleTag(
    tagNumber: string,
    licensePlate: string,
    categoryCode?: string,
  ): Promise<IReturnGreenpass>;
}
