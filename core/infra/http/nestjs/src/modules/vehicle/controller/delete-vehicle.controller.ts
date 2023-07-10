import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DeleteVehicleService } from '../services/delete-vehicle.service';

@Controller('vehicle')
export class DeleteVehicleController {
  constructor(private readonly deleteVehicleService: DeleteVehicleService) {}

  @ApiTags('vehicle')
  @Delete(':vehicleId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async insertVehicle(@Param('vehicleId') vehicleId: string) {
    try {
      return await this.deleteVehicleService.execute(vehicleId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
