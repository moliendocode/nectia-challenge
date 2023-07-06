import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './schemas/vehicle.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async create(vehicle: Vehicle) {
    const createdVehicle = new this.vehicleModel(vehicle);
    return createdVehicle.save();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string) {
    return this.vehicleModel.findById(id).exec();
  }

  async update(id: string, vehicle: Vehicle) {
    return this.vehicleModel.findByIdAndUpdate(id, vehicle).exec();
  }

  async delete(id: string) {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }
}
