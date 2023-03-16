import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import AccessTokenStrategy from './strategies/accessToken.strategy';
import RefreshTokenStrategy from './strategies/refreshToken.strategy';
import UserService from '../user/user.service';
import User from '../user/entity/user.entity';
import Token from './entities/token.entity';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token, User]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export default class AuthModule {}
