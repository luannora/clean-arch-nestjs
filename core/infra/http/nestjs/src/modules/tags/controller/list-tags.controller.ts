import { BadRequestException, Controller, Get, Query, Request, UseGuards, } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ListTagsService } from '../services/list-tags.service';
import { RequestListTagsDTO } from '../dtos/request-list-tags.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ListTagsController {
  constructor(private readonly listTagsService: ListTagsService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  @ApiTags('tags')
  @Get('list-tags')
  async listTags(@Request() req, @Query() filters: RequestListTagsDTO) {
    try {
      return await this.listTagsService.execute(req, filters);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}