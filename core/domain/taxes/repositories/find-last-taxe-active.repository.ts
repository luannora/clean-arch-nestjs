import { ITaxes } from '../entities/taxes.entity';

export interface IFindLastTaxeActiveRepository {
  execute(): Promise<ITaxes>;
}
