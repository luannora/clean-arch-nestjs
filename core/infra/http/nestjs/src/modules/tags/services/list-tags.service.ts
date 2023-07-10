import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { IListTagsUseCase } from '@domain/tags/use-cases/list-tags.usecase';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ListTagsService {
  constructor(private readonly listTagUseCase: IListTagsUseCase) { }

  async execute(req: any, data: IRequestListTagsDTO) {
    return await this.listTagUseCase.execute(req, data);
  }
}
