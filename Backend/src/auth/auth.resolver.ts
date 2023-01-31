import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import AuthService from './auth.service';
import Tokens from './models/tokens.model';
import AuthArgs from './dto/dto/inputs.dto';

@Injectable()
@Resolver(() => Tokens)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => Tokens)
  async login(@Args() authArgs: AuthArgs) {
    return this.authService.login(authArgs);
  }
}
