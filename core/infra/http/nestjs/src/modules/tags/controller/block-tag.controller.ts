import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WebHookGuard } from '../../auth/webhook.guard';
import { BlockTagService } from '../services/block-tag.service';

@Controller('tags')
export class BlockTagController {
  constructor(private readonly blockTagService: BlockTagService) {}

  @ApiTags('tags')
  @UseGuards(WebHookGuard)
  @ApiBearerAuth()
  @Post(':tagId/block')
  async handle(@Param('tagId') tagId: string) {
    try {
      return await this.blockTagService.execute(tagId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
