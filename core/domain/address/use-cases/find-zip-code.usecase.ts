import { IAddress } from '../entities/address.entity';

export interface IFindZipCodeUseCase {
  execute(params: { zipCode: string }): Promise<IAddress>;
}
