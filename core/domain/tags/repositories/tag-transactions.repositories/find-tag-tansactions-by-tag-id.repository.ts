import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto';
import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { IPaginationResponse } from '@infra/http/nestjs/src/_shared/dtos/paginate-response.dto';

export interface IFindTransactionByTagIdRepository {
  execute(tagId: string, tagNumber: IRequestFindTagTransactionByTagIdDTO): Promise<IPaginationResponse<ITagTransaction>>
}
