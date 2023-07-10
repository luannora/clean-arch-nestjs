import { IAddress } from '../entities/address.entity';

export interface IUpdateAddressRepository {
  execute(addressDTO: IAddress): Promise<IAddress>;
}
