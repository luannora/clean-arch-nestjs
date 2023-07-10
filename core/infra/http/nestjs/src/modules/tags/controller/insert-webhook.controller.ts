import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InsertWebHookService } from '../services/insert-web-hook.service';
import { WebHookGuard } from '../../auth/webhook.guard';
import { InsertTagTransactionDTO } from '../dtos/insert-tag-transaction.dto';

@Controller('tags')
export class InsertWebHookController {
  constructor(private readonly insertWebHookService: InsertWebHookService) { }

  @ApiTags('tags')
  @UseGuards(WebHookGuard)
  @ApiBearerAuth()
  @Post('insert-webhook')
  async handle(@Body() data: InsertTagTransactionDTO) {
    try {
      return await this.insertWebHookService.execute(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
