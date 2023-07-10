export enum PlanTypeEnum {
  PRE = 1,
  POS = 2,
}

export enum LoadTypeEnum {
  AUTOMATIC = 1,
  MANUAL = 2,
}

export interface IPlan {
  id?: string;
  planType: PlanTypeEnum;
  loadType: LoadTypeEnum;
}
