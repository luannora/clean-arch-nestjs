import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto';
import { IFindTagTransactionsByTagIdUseCase } from '@domain/tags/use-cases/find-tag-transactions-by-tag-id.usecase';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindTagTransactionsByTagIdService {
  constructor(private readonly findTagTransactionsByTagIdUseCase: IFindTagTransactionsByTagIdUseCase) { }

  async execute(tagId: string, data: IRequestFindTagTransactionByTagIdDTO) {
    return await this.findTagTransactionsByTagIdUseCase.execute(tagId, data);
  }
}