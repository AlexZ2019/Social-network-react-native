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
import { OAuth2Client } from 'google-auth-library';

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
      if (matchedPassword) {
        return this.saveAndReturnTokens(existedUser);
      }
    }
    throw new GraphQLError('Invalid Credentials');
  }
  
  public async refreshTokens(
    user: { id: number; email: string },
    refreshToken: string,
  ) {
    await this.tokenRepository.delete({ userId: user.id, refreshToken });
    return this.saveAndReturnTokens(user);
  }
  
  public async logout(id: number, accessToken: string): Promise<void> {
    await this.tokenRepository.delete({ userId: id, accessToken });
  }
  
  async googleSignIn(payload) {
    const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    const parsedToken = await client.verifyIdToken({
      idToken: payload.token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });
    const email = parsedToken.getPayload().email;
    const userExists = await this.usersService.getUserByEmail(email);
    if (!userExists) {
      const newUser = await this.usersService.createGoogleUser(email);
      return this.saveAndReturnTokens({
        id: newUser.raw.id,
        email: newUser.raw.email,
      });
    }
    return this.saveAndReturnTokens(userExists);
  }
  
  private async saveAndReturnTokens(user) {
    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
    });
    await this.tokenRepository.save({ userId: user.id, ...tokens });
    return tokens;
  }
}
