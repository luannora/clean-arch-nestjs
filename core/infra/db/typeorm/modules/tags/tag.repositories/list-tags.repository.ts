import { IRequestListTagsDTO } from '@domain/tags/dtos/tag-list.dto';
import { ITag } from '@domain/tags/entities/tags.entity';
import { IListTagsRepository } from '@domain/tags/repositories/tag.repositories/list-tags.repository';
import { IUser } from '@domain/user/entities/user.entity';
import { TagSchema } from '@infra/db/typeorm/entities/tags.entity';
import { IPaginationResponse } from '@infra/http/nestjs/src/_shared/dtos/paginate-response.dto';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class ListTagsRepository
  implements IListTagsRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepo: Repository<IUser>,

  ) { }

  async execute(req: any, filters: IRequestListTagsDTO): Promise<IPaginationResponse<ITag>> {
    try {
      const userLogged = await this.userRepo.findOne({
        where: { id: req.user.id },
      });

      if (!userLogged) {
        throw new NotFoundException(`Usuário não encontrado`);
      }

      if (!filters.page) {
        filters.page = 1;
      }

      if (!filters.limit) {
        filters.limit = 10;
      }

      let orderDirection;
      let orderBy;

      if (filters.orderBy) {
        orderBy = filters.orderBy;
      } else {
        orderBy = 'tags.id';
      }
      if (filters.orderDirection) {
        orderDirection = filters.orderDirection;
      } else {
        orderDirection = 'ASC';
      }

      let tags = await this.tagRepo
        .createQueryBuilder('tags')
        .leftJoinAndSelect('tags.user', 'u')
        .leftJoinAndSelect('tags.vehicle', 'v')
        .where('u.id = :userId', {
          userId: userLogged.id,
        })
        .take(filters.limit)
        .skip((filters.page - 1) * filters.limit)
        .orderBy(orderBy, orderDirection)

      if (filters.plate) {
        tags.andWhere(
          'LOWER(v.plate) like LOWER(:plate)',
          { plate: `%${filters.plate}%` },
        );
      }
      if (filters.status) {
        tags.andWhere(
          'LOWER(tags.status) like LOWER(:status)',
          { status: `%${filters.status}%` },
        );
      }
      if (filters.nickName) {
        tags.andWhere(
          'LOWER(tags.nick_name) like LOWER(:nick_name)',
          { nick_name: `%${filters.nickName}%` },
        );
      }

      const result: any = await tags.getManyAndCount();

      console.log(result[0])

      let data = []

      for (let tag of result[0]) {
        let input: any = {
          tagId: tag?.id,
          observation: tag?.observation,
          tagNumber: tag?.tagNumber,
          tagStatus: tag?.tagStatus,
        }

        data.push(input)
      }


      return {
        data: data,
        length: result[1]
      };


    } catch (error) {
      throw new Error(error)
    }
  }
}
