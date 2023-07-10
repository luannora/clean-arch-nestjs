import { IRequestFindTagTransactionByTagIdDTO } from '@domain/tags/dtos/find-tag-tansaction-by-tag-id.dto';
import { ITagTransaction } from '@domain/tags/entities/tagTransaction.entity';
import { ITag } from '@domain/tags/entities/tags.entity';
import { IFindTransactionByTagIdRepository } from '@domain/tags/repositories/tag-transactions.repositories/find-tag-tansactions-by-tag-id.repository';
import { IPaginationResponse } from '@infra/http/nestjs/src/_shared/dtos/paginate-response.dto';
import { RepositoryProxyModule } from '@infra/http/nestjs/src/proxy/repository.proxy.module';
import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class FindTransactionByTagIdRepository
  implements IFindTransactionByTagIdRepository {
  constructor(
    @Inject(RepositoryProxyModule.TAG_REPOSITORY)
    private readonly tagRepo: Repository<ITag>,
  ) { }

  async execute(tagId: string, inputDTO: IRequestFindTagTransactionByTagIdDTO): Promise<IPaginationResponse<ITagTransaction>> {
    try {
      const tag = await this.tagRepo.findOne({
        where: { id: tagId },
      });

      if (!tag) {
        throw new NotFoundException(`Tag não encontrada`);
      }

      if (!inputDTO.page) {
        inputDTO.page = 1;
      }

      if (!inputDTO.limit) {
        inputDTO.limit = 10;
      }


      let orderDirection;
      let orderBy;

      if (inputDTO.orderBy) {
        orderBy = inputDTO.orderBy;
      } else {
        orderBy = 'tags.id';
      }
      if (inputDTO.orderDirection) {
        orderDirection = inputDTO.orderDirection;
      } else {
        orderDirection = 'ASC';
      }

      let tags: any = await this.tagRepo
        .createQueryBuilder('tags')
        .leftJoinAndSelect('tags.tagTransactions', 'tt')
        .where('tags.id = :id', {
          id: tagId,
        })
        .take(inputDTO.limit)
        .skip((inputDTO.page - 1) * inputDTO.limit)
        .orderBy(orderBy, orderDirection)

      if (inputDTO.created_at) {
        tags.andWhere(
          'tt.created_at = :created_at',
          { created_at: `${inputDTO.created_at}` },
        );
      }

      const result: any = await tags.getManyAndCount();

      return {
        data: result[0],
        length: result[1],
      };
    } catch (error) {
      throw new Error(error)
    }
  }
}
