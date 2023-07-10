import { IMoveAccountUseCase } from '@domain/account/use-cases/move-account.usercase';
import { Injectable } from '@nestjs/common';
import { MovementAccountDTO } from '../dtos/movement-account.dto';

@Injectable()
export class MovementAccountService {
  constructor(private readonly moveAccountUC: IMoveAccountUseCase) {}

  async execute(paramsDTO: MovementAccountDTO) {
    return await this.moveAccountUC.execute(paramsDTO);
  }
}
