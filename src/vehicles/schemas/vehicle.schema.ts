import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
