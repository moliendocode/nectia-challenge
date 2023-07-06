import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost/my-db',
    ),
    CacheModule.register({
      store: require('cache-manager-ioredis'),
      host: 'localhost',
      port: 6379,
    }),
    UsersModule,
    VehiclesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
