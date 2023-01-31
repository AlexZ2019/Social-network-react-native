import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import constants from './constants/auth.constants';
import { GraphQLError } from 'graphql/error';

@Injectable()
export default class AuthService {
  constructor(
    // private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  
  public login(payload) {
    const existedUser = payload;
    if (existedUser.email === 'email') {
      const tokens = this.generateTokens(payload);
      return tokens;
    }
    if (!existedUser) {
      throw new GraphQLError('Invalid Credentials');
    }
  }
  
  private generateTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_AT_SECRET'),
        expiresIn: constants.ACCESS_TOKEN_TIMEOUT,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_RT_SECRET'),
        expiresIn: constants.REFRESH_TOKEN_TIMEOUT,
      }),
    };
  }
}
