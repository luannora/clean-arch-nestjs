import { IAddress } from '../entities/address.entity';

export interface IUpdateAddressUserUseCase {
  execute(insertDTO: IAddress): Promise<IAddress>;
}
