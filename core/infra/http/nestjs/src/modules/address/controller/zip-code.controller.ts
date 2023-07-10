import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindZipCodeService } from '../services/find-zip-code.service';

@Controller('address')
export class ZipCodeController {
  constructor(private readonly findZipCodeService: FindZipCodeService) {}

  @ApiTags('address')
  @Get('zip-code/:zipCode')
  async findZipCode(@Param('zipCode') zipCode: string) {
    try {
      return await this.findZipCodeService.execute(zipCode);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
