import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import Tokens from './models/tokens.model';
import AuthArgs from './dto/inputs.dto';
import RefreshTokenGuard from './guards/refreshToken.guard';
import AccessTokenGuard from './guards/accessToken.guard';

@Injectable()
@Resolver(() => Tokens)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => Tokens)
  async login(@Args() authArgs: AuthArgs) {
    return this.authService.login(authArgs);
  }
  
  @Mutation(() => Tokens)
  @UseGuards(RefreshTokenGuard)
  public async refreshToken(@Context() context): Promise<Tokens> {
    return this.authService.refreshTokens(
      context.req.user,
      context.req.headers.authorization.replace('Bearer ', ''),
    );
  }
  
  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  public async logout(@Context() context): Promise<void> {
    await this.authService.logout(
      context.req.user.id,
      context.req.headers.authorization.replace('Bearer ', ''),
    );
  }
}
