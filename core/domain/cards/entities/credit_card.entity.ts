import { IUser } from '@domain/user/entities/user.entity';

export interface ICreditCard {
  id: string;
  cardNumber: string;
  cardDueDate: Date;
  cardCcv: number;
  cardOwnerName: string;
  cardOwnerDocument: string;
  cardOwnerBornDate: Date;
  nickName: string;
  source: string;
  externalRef: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  user: IUser;
}
