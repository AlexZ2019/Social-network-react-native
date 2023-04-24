import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from './user.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import UserModel from './model/user.model';
import Token from '../auth/entities/token.entity';
import UserArgs from './dto/user.dto';
import AuthArgs from '../auth/dto/inputs.dto';
import UsersArgs from './dto/users.dto';
import UsersModel from './model/users.model';

@Injectable()
@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  @Query(() => UserModel)
  @UseGuards(AccessTokenGuard)
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
  async createUser(@Args() user: AuthArgs): Promise<boolean> {
    try {
      await this.userService.createUser(user);
      return true;
    } catch (e) {
      throw e;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async editUser(@Args() user: UserArgs, @Context() context): Promise<boolean> {
    await this.userService.updateUser(user, context.req.user.id);
    return true;
  }

  @Query(() => UsersModel)
  // @UseGuards(AccessTokenGuard)
  async getUsers(
    @Args() args: UsersArgs,
    @Context() context,
  ): Promise<UsersModel> {
    return this.userService.getUsers(
      args.email,
      args.nickname,
      args.page,
      args.pageSize,
    );
  }
}

export default UserResolver;
