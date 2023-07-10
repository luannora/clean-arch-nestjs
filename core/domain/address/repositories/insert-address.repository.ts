import { IAddress } from '../entities/address.entity';

export interface IInsertAddressRepository {
  execute(addressDTO: IAddress): Promise<IAddress>;
}
