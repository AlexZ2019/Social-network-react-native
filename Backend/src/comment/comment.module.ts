import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentService from './comment.service';
import CommentResolver from './comment.resolver';
import Comment from './entity/comment.entity';
import UserService from '../user/user.service';
import User from '../user/entity/user.entity';
import Friend from '../friend/entity/friend.entity';
import PostService from '../post/post.service';
import Post from '../post/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Friend, Post])],
  providers: [CommentService, CommentResolver, UserService, PostService],
  exports: [CommentService],
})
export default class CommentModule {}
