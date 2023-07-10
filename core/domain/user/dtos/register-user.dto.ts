import { IRegisterAddressDTO } from '@domain/address/dtos/register-address.dto';

export interface IRegisterUserDTO {
  name: string;
  fantasyName?: string;
  email: string;
  document: string;
  documentType: string;
  bornDate?: Date;
  celphone?: string;
  telephone?: string;
  planType: number;
  loadType: number;
  password: string;
  passwordConfirmation: string;
  address: IRegisterAddressDTO;
}
