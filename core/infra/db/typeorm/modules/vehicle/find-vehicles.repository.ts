import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { RepositoryProxyModule } from '@nest/src/proxy/repository.proxy.module';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { IFindVehiclesRepository } from '@domain/vehicle/repositories/find-vehicles.repository';
import { IRequestFindAllVehiclesDTO } from '@domain/vehicle/dtos/request-find-all-vehicles.dto';
import { IResponseFindAllVehiclesDto } from '@domain/vehicle/dtos/response-find-all-vehicles.dto';
import { ResponseFindAllVehiclesDTO } from '@infra/http/nestjs/src/modules/vehicle/dtos/response-find-all-vehicles.dto';

export class FindVehiclesRepository implements IFindVehiclesRepository {
  constructor(
    @Inject(RepositoryProxyModule.VEHICLE_REPOSITORY)
    private readonly repo: Repository<IVehicle>,
  ) {}

  async execute(
    paramsDTO: IRequestFindAllVehiclesDTO,
    userId: string,
  ): Promise<IResponseFindAllVehiclesDto> {
    const queryBuilderSelect = this.repo.createQueryBuilder('vehicle');

    queryBuilderSelect.leftJoinAndSelect(
      'vehicle.vehicle_category',
      'vehicle_category',
    );

    queryBuilderSelect.andWhere('vehicle.user_id = :id', {
      id: userId,
    });

    if (paramsDTO.plate) {
      queryBuilderSelect.andWhere('LOWER(vehicle.plate) like LOWER(:plate)', {
        plate: `%${paramsDTO.plate}%`,
      });
    }

    if (!paramsDTO.page) {
      paramsDTO.page = 1;
    }

    if (!paramsDTO.limit) {
      paramsDTO.limit = 50;
    }

    let orderDirection;
    let orderBy;

    if (paramsDTO.orderBy) {
      orderBy = paramsDTO.orderBy;
    } else {
      orderBy = 'id';
    }
    if (paramsDTO.orderDirection) {
      orderDirection = paramsDTO.orderDirection;
    } else {
      orderDirection = 'ASC';
    }

    const [result, count] = await queryBuilderSelect
      .take(paramsDTO.limit)
      .skip((paramsDTO.page - 1) * paramsDTO.limit)
      .orderBy(orderBy, orderDirection)
      .getManyAndCount();

    let resultDto = new ResponseFindAllVehiclesDTO();
    resultDto.data = result;
    resultDto.length = count;

    return resultDto;
  }
}
