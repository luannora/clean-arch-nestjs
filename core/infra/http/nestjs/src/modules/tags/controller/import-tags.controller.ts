import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../auth/admin.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as reader from 'xlsx';
import { ITag, TagStatusEnum } from '@domain/tags/entities/tags.entity';
import { ImportTagsService } from '../services/import-tags.service';

@Controller('tags')
export class ImportTagsController {
  constructor(private readonly imporTagsService: ImportTagsService) {}

  @Post('import')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiTags('tag')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async importTags(@UploadedFile('file') file: any) {
    // Dismount file csv
    const importedFile = reader.read(file.buffer);
    var sheet_name_list = importedFile.SheetNames;
    const tmpXlsx = reader.utils.sheet_to_json(
      importedFile.Sheets[sheet_name_list[0]],
    );

    let importTags: ITag[] = [];

    tmpXlsx.forEach((tag) => {
      if (!tag['NUMERO DE SERIE'] || !tag['CAIXA MÃE'] || !tag['CAIXA FILHA']) {
        throw new BadRequestException('Arquivo contem falhas, favor verificar');
      }
      let getTag: ITag = {
        tagNumber: tag['NUMERO DE SERIE'],
        motherBox: tag['CAIXA MÃE'],
        childBox: tag['CAIXA FILHA'],
        tagStatus: TagStatusEnum.Notassociated,
      };
      importTags.push(getTag);
    });
    return await this.imporTagsService.execute(importTags);
  }
}
