import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadGatewayResponse, ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { FindTagTransactionsByTagIdDTO } from '../dtos/find-tag-transactions-by-tag-id.dto';
import { FindTagTransactionsByTagIdService } from '../services/find-tag-transactions-by-tag-id.service';


@Controller()
export class FindTagTransactionsByTagIdController {
  constructor(private readonly findTagTransactionsByTagIdService: FindTagTransactionsByTagIdService) { }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  @ApiTags('tags')
  @Get(':tagId/transactions')
  async findTagTransactionsByTagId(
    @Param('tagId') tagId: string,
    @Query() inputDTO: FindTagTransactionsByTagIdDTO
  ) {
    try {
      return await this.findTagTransactionsByTagIdService.execute(tagId, inputDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}