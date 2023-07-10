import { IRequestFindTagTransactionByTagIdDTO } from '../dtos/find-tag-tansaction-by-tag-id.dto';

export interface IFindTagTransactionsByTagIdUseCase {
  execute(tagId: string, inputDTO: IRequestFindTagTransactionByTagIdDTO): Promise<any>;
}