/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IFindZipCodeUseCase } from '@domain/address/use-cases/find-zip-code.usecase';

@Injectable()
export class FindZipCodeService {
  constructor(private readonly findZipCodeUC: IFindZipCodeUseCase) {}

  async execute(zipCode: string) {
    return await this.findZipCodeUC.execute({ zipCode });
  }
}
