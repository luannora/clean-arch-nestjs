import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto'
import { IFindTransactionByTagIdRepository } from '@domain/tags/repositories/tag-transactions.repositories/find-tag-tansactions-by-tag-id.repository'
import { IFindTagTransactionsByTagIdUseCase } from '@domain/tags/use-cases/find-tag-transactions-by-tag-id.usecase'


export class FindTagTransactionsByTagIdUseCase implements IFindTagTransactionsByTagIdUseCase {
  constructor(
    private readonly findTagTransactionsByTagIdRepo: IFindTransactionByTagIdRepository,
  ) { }

  async execute(tagId: string, filtersDTO: IRequestFindTagTransactionByTagIdDTO): Promise<any> {
    try {
      const tags = await this.findTagTransactionsByTagIdRepo.execute(tagId, filtersDTO)

      return tags
    } catch (error) {
      throw new Error(error)
    }
  }
}
