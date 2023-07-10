import { IAddress } from '../entities/address.entity';

export interface IInsertAddressUserUseCase {
  execute(insertDTO: IAddress): Promise<IAddress>;
}
