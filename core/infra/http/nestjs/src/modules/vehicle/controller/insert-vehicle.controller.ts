import {
  BadRequestException,
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InsertVehicleService } from '../services/insert-vehicle.service';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';
import { AuthGuard } from '@nestjs/passport';
import { InsertVehicleDTO } from '../dtos/insert-vehicle.dto';

@Controller('vehicle')
export class InsertVehicleController {
  constructor(private readonly insertVehicleService: InsertVehicleService) {}

  @ApiTags('vehicle')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async insertVehicle(@Request() req, @Body() paramsDTO: InsertVehicleDTO) {
    try {
      return await this.insertVehicleService.execute(
        { ...paramsDTO, vehicleCategory: { id: paramsDTO.vehicleCategoryId } },
        req.user.id,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
