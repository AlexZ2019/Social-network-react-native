import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FriendService from './friend.service';
import { Injectable, UseGuards } from '@nestjs/common';
import Token from '../auth/entities/token.entity';
import UsersArgs from '../user/dto/users.dto';
import UsersModel from '../user/model/users.model';
import AccessTokenGuard from '../auth/guards/accessToken.guard';

@Injectable()
@Resolver()
class FriendResolver {
  constructor(
    private readonly friendService: FriendService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  @Query(() => UsersModel)
  @UseGuards(AccessTokenGuard)
  async getFriends(@Args() args: UsersArgs, @Context() context) {
    return this.friendService.getFriends(context.req.user.id, args.searchValue);
  }
}

export default FriendResolver;
