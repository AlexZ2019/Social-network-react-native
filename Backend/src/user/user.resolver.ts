import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from './user.service';
import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import UserModel from './model/user.model';
import Token from '../auth/entities/token.entity';
import UserArgs from './dto/user.dto';
import AuthArgs from '../auth/dto/inputs.dto';
import UsersArgs from './dto/users.dto';
import UsersModel from './model/users.model';
import GetUserArgs from './dto/getUser.dto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import AvatarModel from './model/avatar.model';
import {
  ImageValidationPipe,
} from '../common/helpers/validation/imageValidation.pipe';

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
    try {
      const tokens = await this.tokenRepository.findBy({
        userId: context.req.user.id,
      });
      const userToken = context.req.headers.authorization.replace(
        'Bearer ',
        '',
      );
      if (tokens.some((token) => token.accessToken === userToken)) {
        return this.userService.getUserByEmail(context.req.user.email);
      }
    } catch (e) {
      throw new BadRequestException('Error getting user');
    }
  }

  @Mutation(() => Boolean)
  async createUser(@Args() user: AuthArgs): Promise<boolean> {
    try {
      await this.userService.createUser(user);
      return true;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async editUser(@Args() user: UserArgs, @Context() context): Promise<boolean> {
    try {
      await this.userService.updateUser(user, context.req.user.id);
      return true;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  @Mutation(() => AvatarModel)
  @UseGuards(AccessTokenGuard)
  async uploadUserAvatar(
    @Args({ name: 'image', type: () => GraphQLUpload }, ImageValidationPipe)
      image: Upload,
    @Context() context,
  ): Promise<{ imageUrl: string }> {
    try {
      return this.userService.uploadUserAvatar(context.req.user.id, image);
    } catch (e) {
      throw new Error('Error uploading image');
    }
  }
  
  @Query(() => UsersModel)
  @UseGuards(AccessTokenGuard)
  async getUsers(
    @Args() args: UsersArgs,
    @Context() context,
  ): Promise<UsersModel> {
    try {
      return this.userService.getUsers(
        args.searchValue,
        args.page,
        args.pageSize,
        context.req.user.id,
      );
    } catch (e) {
      throw new BadRequestException('Error getting users');
    }
  }

  @Query(() => UserModel)
  @UseGuards(AccessTokenGuard)
  async getUser(@Args() args: GetUserArgs) {
    try {
      return this.userService.getUserById(args.id);
    } catch (e) {
      throw new BadRequestException('Error getting users');
    }
  }
}

export default UserResolver;
