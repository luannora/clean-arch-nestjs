import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestFindAllVehiclesDTO } from '../dtos/request-find-all-vehicles.dto';
import { FindVehicleService } from '../services/find-vehicle.service';

@Controller('vehicle')
export class FindVehicleController {
  constructor(private readonly findVehicleService: FindVehicleService) {}

  @ApiTags('vehicle')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async insertVehicle(
    @Request() req,
    @Query() paramsDTO: RequestFindAllVehiclesDTO,
  ) {
    try {
      return await this.findVehicleService.execute(paramsDTO, req.user.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
