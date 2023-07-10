import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WebHookGuard } from '../../auth/webhook.guard';
import { ActiveTagService } from '../services/active-tag.service';
import { ActiveTagDTO } from '../dtos/active-tag.dto';

@Controller('tags')
export class ActiveTagController {
  constructor(private readonly activeTagService: ActiveTagService) {}

  @ApiTags('tags')
  @UseGuards(WebHookGuard)
  @ApiBearerAuth()
  @Post(':tagId/active')
  async handle(@Param('tagId') tagId: string, @Body() paramDto: ActiveTagDTO) {
    try {
      return await this.activeTagService.execute(tagId, paramDto.vehicleId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
