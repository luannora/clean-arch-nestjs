export interface ITaxes {
  id?: string;
  feePercent: number;
  feeFixed: number;
  startAt: Date;
  endAt: Date;
  active: boolean;
}
