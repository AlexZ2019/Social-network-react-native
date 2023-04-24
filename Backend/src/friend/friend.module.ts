import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FriendService from './friend.service';
import FriendResolver from './friend.resolver';
import User from './entity/friend.entity';
import Token from '../auth/entities/token.entity';
import Friend from './entity/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Friend])],
  providers: [FriendService, FriendResolver],
  exports: [FriendService],
})
export default class FriendModule {}
