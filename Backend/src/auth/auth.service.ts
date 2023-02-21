import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from './constants/auth.constants';
import { GraphQLError } from 'graphql/error';
import { ConfigService } from '@nestjs/config';
import UserService from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import comparePassword from './utils/comparePassword';
import Token from './entities/token.entity';
import AuthArgs from './dto/inputs.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

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
  
  public async login(user: AuthArgs) {
    const existedUser = await this.usersService.getUserByEmailWithPassword(
      user.email,
    );
    if (existedUser) {
      const matchedPassword = comparePassword(
        user.password,
        existedUser.password,
      );
      // TODO: check if comparePassword works ^^
      if (matchedPassword) {
        const payload = {
          email: existedUser.email,
          id: existedUser.id,
        };
        const tokens = this.generateTokens(payload);
        await this.tokenRepository.save({ userId: existedUser.id, ...tokens });
        return tokens;
      }
    }
    throw new GraphQLError('Invalid Credentials');
  }
  
  public async refreshTokens(
    user: { id: number; email: string },
    refreshToken: string,
  ) {
    const newTokens = this.generateTokens(user);
    await this.tokenRepository.delete({ userId: user.id, refreshToken });
    await this.tokenRepository.save({ userId: user.id, ...newTokens });
    return newTokens;
  }
  
  public async logout(id: number, accessToken: string): Promise<void> {
    await this.tokenRepository.delete({ userId: id, accessToken });
  }
}
