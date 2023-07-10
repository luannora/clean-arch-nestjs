import { HttpExceptionEnum } from '@domain/_protocols/errors/http.enum';
import { HttpError } from '@domain/_protocols/errors/http.error';
import { IGetCepAdapter } from '@domain/adapters/get-cep-adapter/get-cep.adapter';
import { IAddress } from '@domain/address/entities/address.entity';
import { IFindZipCodeUseCase } from '@domain/address/use-cases/find-zip-code.usecase';

export class FindZipCodeUseCase implements IFindZipCodeUseCase {
  constructor(private readonly getCepAdater: IGetCepAdapter) {}

  async execute(params: { zipCode: string }): Promise<IAddress> {
    try {
      const findCep = await this.getCepAdater.getCep(params.zipCode);

      if (!findCep) {
        throw new HttpError({
          code: HttpExceptionEnum.NOT_FOUND,
          message: 'CEP não localizado.',
        });
      }
      const result: IAddress = {
        addressName: findCep.street,
        addressComplement: '',
        addressNumber: '',
        addressZipCode: findCep.cep,
        district: findCep.district,
        city: findCep.city,
        federalState: findCep.state,
      };

      return result;
    } catch (error) {
      throw new HttpError({
        code: HttpExceptionEnum.NOT_FOUND,
        message: 'CEP não localizado.',
      });
    }
  }
}
