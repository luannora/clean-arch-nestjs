import {
  BadRequestException,
  Controller,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVehicleDTO } from '../dtos/update-vehicle.dto';
import { UpdateVehicleService } from '../services/update-vehicle.service';

@Controller('vehicle')
export class UpdateVehicleController {
  constructor(private readonly updateVehicleService: UpdateVehicleService) {}

  @ApiTags('vehicle')
  @Put(':vehicleId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async insertVehicle(
    @Body() paramsDTO: UpdateVehicleDTO,
    @Param('vehicleId') vehicleId: string,
  ) {
    try {
      return await this.updateVehicleService.execute({
        id: vehicleId,
        observation: paramsDTO.observation,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
