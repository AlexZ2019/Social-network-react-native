import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from './user.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import UserModel from './models/user.model';
import Token from '../auth/entities/token.entity';
import UserArgs from './dto/user.dto';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  
  @Query(() => UserModel)
  async getCurrentUser(@Context() context): Promise<UserModel> {
    const tokens = await this.tokenRepository.findBy({
      userId: context.req.user.id,
    });
    const userToken = context.req.headers.authorization.replace('Bearer ', '');
    if (tokens.some((token) => token.accessToken === userToken)) {
      return this.userService.getUserByEmail(context.req.user.email);
    }
  }
  
  @Mutation(() => Boolean)
  async editUser(@Args() user: UserArgs, @Context() context): Promise<boolean> {
    await this.userService.updateUser(user, context.req.user.id);
    return true;
  }
}

export default UserResolver;
