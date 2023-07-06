import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() vehicle: Vehicle) {
    return this.vehiclesService.create(vehicle);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.vehiclesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() vehicle: Vehicle) {
    return this.vehiclesService.update(id, vehicle);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vehiclesService.delete(id);
  }
}
