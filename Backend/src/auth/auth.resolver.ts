import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import Tokens from './model/tokens.model';
import AuthArgs from './dto/inputs.dto';
import RefreshTokenGuard from './guards/refreshToken.guard';
import AccessTokenGuard from './guards/accessToken.guard';
import TokenArgs from './dto/token.dto';

@Injectable()
@Resolver(() => Tokens)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens)
  async login(@Args() authArgs: AuthArgs) {
    try {
      return this.authService.login(authArgs);
    } catch (e) {
      throw new BadRequestException('Login Error');
    }
  }
  
  @Mutation(() => Tokens)
  @UseGuards(RefreshTokenGuard)
  public async refreshToken(@Context() context): Promise<Tokens> {
    try {
      return this.authService.refreshTokens(
        context.req.user,
        context.req.headers.authorization.replace('Bearer ', ''),
      );
    } catch (e) {
      throw new BadRequestException('Error getting refresh token');
    }
  }
  
  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  public async logout(@Context() context): Promise<boolean> {
    await this.authService.logout(
      context.req.user.id,
      context.req.headers.authorization.replace('Bearer ', ''),
    );
    return true;
  }
  
  @Mutation(() => Tokens)
  async loginWithGoogle(@Args() token: TokenArgs) {
    return this.authService.googleSignIn(token);
  }
}
