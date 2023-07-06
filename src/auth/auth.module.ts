import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
    CacheModule.register({
      store: redisStore,
      uri: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
