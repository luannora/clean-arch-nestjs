import { IInsertTagTransactionDTO } from '@domain/tags/dtos/insert-tag-transaction-dto';
import { Injectable } from '@nestjs/common';
import { IInsertWebHookUseCase } from '@domain/tags/use-cases/insert-webhook.usecase'

@Injectable()
export class InsertWebHookService {
  constructor(private readonly insertWebHookUseCase: IInsertWebHookUseCase) { }

  async execute(data: IInsertTagTransactionDTO) {
    return await this.insertWebHookUseCase.execute(data);
  }
}
