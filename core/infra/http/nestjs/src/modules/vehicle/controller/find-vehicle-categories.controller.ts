import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindVehicleCategoriesService } from '../services/find-vehicle-categories.service';

@Controller('vehicle')
export class FindVehicleCategoriesController {
  constructor(
    private readonly findVehicleCategoriesService: FindVehicleCategoriesService,
  ) {}

  @ApiTags('vehicle')
  @Get('/categories')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getVehicleCategories() {
    try {
      return await this.findVehicleCategoriesService.execute();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
