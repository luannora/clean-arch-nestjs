import { IActiveTagUseCase } from '@domain/tags/use-cases/active-tag.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActiveTagService {
  constructor(private readonly activeTagUseCase: IActiveTagUseCase) {}

  async execute(tagId: string, vehicleId: string) {
    return await this.activeTagUseCase.execute(tagId, vehicleId);
  }
}
