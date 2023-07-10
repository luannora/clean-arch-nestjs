import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { IListTagsRepository } from '@domain/tags/repositories/tag.repositories/list-tags.repository';
import { ListTagsUseCase } from './list-tags.usecase';
import { BadRequestException } from '@nestjs/common';


// Mock the repository
class MockListTagsRepository implements IListTagsRepository {
  async execute(req: any, filtersDTO: IRequestListTagsDTO): Promise<any> {
    return [];
  }
}

describe('ListTagsUseCase', () => {
  let listTagsUseCase: ListTagsUseCase;
  let listTagsRepo: IListTagsRepository;

  beforeEach(() => {
    listTagsRepo = new MockListTagsRepository();
    listTagsUseCase = new ListTagsUseCase(listTagsRepo);
  });

  it('should return empty array if no tags found', async () => {
    const req = {};
    const filtersDTO = {};

    const result: any = await listTagsUseCase.execute(req, filtersDTO);

    expect(result).toEqual([]);
  });

  it('should throw BadRequestException if tags are not found', async () => {
    const req = {};
    const filtersDTO = {};

    // Mock the repository to return null
    listTagsRepo.execute = jest.fn().mockResolvedValue(null);

    await expect(listTagsUseCase.execute(req, filtersDTO)).rejects.toThrowError(BadRequestException);
  });
});
