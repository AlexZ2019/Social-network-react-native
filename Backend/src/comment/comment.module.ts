import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentService from './comment.service';
import CommentResolver from './comment.resolver';
import Comment from './entity/comment.entity';
import UserService from '../user/user.service';
import User from '../user/entity/user.entity';
import Friend from '../friend/entity/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Friend])],
  providers: [CommentService, CommentResolver, UserService],
  exports: [CommentService],
})
export default class CommentModule {}
