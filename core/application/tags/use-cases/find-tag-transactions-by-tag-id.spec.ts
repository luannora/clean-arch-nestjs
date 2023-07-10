import { IFindTransactionByTagIdRepository } from '@domain/tags/repositories/tag-transactions.repositories/find-tag-tansactions-by-tag-id.repository';
import { FindTagTransactionsByTagIdUseCase } from './find-tag-transactions-by-tag-id.usecase';
import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto';

describe('FindTagTransactionsByTagIdUseCase', () => {
  let useCase: FindTagTransactionsByTagIdUseCase;
  let repository: IFindTransactionByTagIdRepository;

  beforeEach(() => {
    repository = {} as IFindTransactionByTagIdRepository;
    useCase = new FindTagTransactionsByTagIdUseCase(repository);
  });

  describe('execute', () => {
    it('should call the repository with the provided filters', async () => {
      const tagId = '12345';
      const filtersDTO: IRequestFindTagTransactionByTagIdDTO = {
        page: 1,
        limit: 10,
      };

      repository.execute = jest.fn().mockResolvedValue([]);

      await useCase.execute(tagId, filtersDTO);

      expect(repository.execute).toHaveBeenCalledWith(tagId, filtersDTO);
    });

    it('should return the result returned by the repository', async () => {
      const tagId = '12345';
      const filtersDTO: IRequestFindTagTransactionByTagIdDTO = {
        page: 1,
        limit: 10,
      };

      const tagTransactions = [
        { id: '1', amount: 10 },
        { id: '2', amount: 20 },
      ];

      repository.execute = jest.fn().mockResolvedValue(tagTransactions);

      const result = await useCase.execute(tagId, filtersDTO);

      expect(result).toEqual(tagTransactions);
    });

    it('should throw an error if an error occurs', async () => {
      const tagId = '12345';
      const filtersDTO: IRequestFindTagTransactionByTagIdDTO = {
        page: 1,
        limit: 10,
      };

      const error = 'Error: Internal Server Error';

      repository.execute = jest.fn().mockRejectedValue(error);

      await expect(useCase.execute(tagId, filtersDTO)).rejects.toThrowError(error);
    });
  });
});
