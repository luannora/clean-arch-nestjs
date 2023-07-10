

import { IImportTagsResultDTO } from '@domain/tags/dtos/import-tags-result.dto';
import { ITag } from '@domain/tags/entities/tags.entity';
import { ImportTagsUseCase } from './import-tags.usecase';
import { IFindByTagNumberRepository } from '@domain/tags/repositories/tag.repositories/find-by-tag-number.repository';
import { IInsertTagRepository } from "@domain/tags/repositories/tag.repositories/insert-tag.respository"

// Mock the repositories
class MockInsertTagRepository implements IInsertTagRepository {
  async execute(tag: ITag): Promise<ITag> {
    return tag
  }
}

class MockFindByTagNumberRepository implements IFindByTagNumberRepository {
  async execute(tagNumber: string): Promise<ITag | null> {
    return null;
  }
}

describe('ImportTagsUseCase', () => {
  let importTagsUseCase: ImportTagsUseCase;
  let insertTagRepo: IInsertTagRepository;
  let findByTagNumberRepo: IFindByTagNumberRepository;

  beforeEach(() => {
    insertTagRepo = new MockInsertTagRepository();
    findByTagNumberRepo = new MockFindByTagNumberRepository();
    importTagsUseCase = new ImportTagsUseCase(insertTagRepo, findByTagNumberRepo);
  });

  it('should insert tags', async () => {
    const tags: ITag[] = [
      { tagNumber: 'tag1' },
      { tagNumber: 'tag2' },
    ];

    const result: IImportTagsResultDTO = await importTagsUseCase.execute(tags);

    expect(result.tagsInserted).toBe(2);
    expect(result.tagsNInserted).toBe(0);
  });

  it('should not insert tags that already exist', async () => {
    const tags: ITag[] = [
      { tagNumber: 'tag1' },
      { tagNumber: 'tag2' },
    ];

    // Mock the repository to return a tag for 'tag1'
    findByTagNumberRepo.execute = jest.fn().mockResolvedValue({ tagNumber: 'tag1' });

    const result: IImportTagsResultDTO = await importTagsUseCase.execute(tags);

    expect(result.tagsInserted).toBe(0);
    expect(result.tagsNInserted).toBe(2);
  });
});
