import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import FriendService from './friend.service';
import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import UsersArgs from '../user/dto/users.dto';
import UsersModel from '../user/model/users.model';
import AccessTokenGuard from '../auth/guards/accessToken.guard';

@Injectable()
@Resolver()
class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => UsersModel)
  @UseGuards(AccessTokenGuard)
  async getFriends(@Args() args: UsersArgs, @Context() context) {
    try {
      return this.friendService.getFriends(
        context.req.user.id,
        args.searchValue,
      );
    } catch (e) {
      throw new BadRequestException('Error getting friends');
    }
  }
}

export default FriendResolver;
