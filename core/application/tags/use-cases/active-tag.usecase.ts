import { IGreenpassAdapter } from '@domain/adapters/greenpass-adapter/greenpass-adapter';
import { TagStatusEnum } from '@domain/tags/entities/tags.entity';
import { IGetTagByIdRepository } from '@domain/tags/repositories/tag.repositories/get-tag-by-id.repository';
import { IUpdateTagRepository } from '@domain/tags/repositories/tag.repositories/update-tag-repository';
import { IActiveTagUseCase } from '@domain/tags/use-cases/active-tag.usecase';
import { IFindVehicleByIdRepository } from '@domain/vehicle/repositories/find-vehicle-by-id.repository';
import { BadRequestException } from '@nestjs/common';

export class ActiveTagUseCase implements IActiveTagUseCase {
  constructor(
    private readonly getTagByIdRepo: IGetTagByIdRepository,
    private readonly getVehicleByIdRepo: IFindVehicleByIdRepository,
    private readonly greenPassAdapter: IGreenpassAdapter,
    private readonly updateTagRepo: IUpdateTagRepository,
  ) {}

  async execute(tagId: string, vehicleId: string): Promise<boolean> {
    const tag = await this.getTagByIdRepo.execute(tagId);

    if (!tag) {
      throw new BadRequestException('Tag não encontrada');
    }

    const vehicle = await this.getVehicleByIdRepo.execute(vehicleId);

    if (!vehicle) {
      throw new BadRequestException('Veículo não encontrado');
    }

    let result = await this.greenPassAdapter.activateTag({
      tagNumber: tag.tagNumber,
      categoryCode: vehicle.vehicleCategory.categoryCodeGp,
      licensePlate: vehicle.plate,
    });

    if (result) {
      if (result.nsu) {
        tag.tagStatus = TagStatusEnum.Active;
        tag.vehicle = vehicle;
        await this.updateTagRepo.execute(tag);
        return true;
      }
    }

    return false;
  }
}
