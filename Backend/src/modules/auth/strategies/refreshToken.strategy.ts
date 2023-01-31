import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
// import { UserPayload } from '../types';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_RT_SECRET'),
    });
  }
  
  async validate(validationPayload: {
    email: string;
    id: number;
  }): Promise<any> {
    //TODO: add type
    return {
      email: validationPayload.email,
      id: validationPayload.id,
    };
  }
}
