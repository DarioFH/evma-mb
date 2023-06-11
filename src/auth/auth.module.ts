import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { EncryptUtils } from 'src/utils/encrypt-util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConstants } from './jwtConstants.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forFeature([Users]), 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {expiresIn: '600s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, EncryptUtils, JwtConstants, {provide: 'APP_GUARD', useClass: AuthGuard}]
})
export class AuthModule {}
