import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostService from './post.service';
import PostResolver from './post.resolver';
import Post from './entity/post.entity';
import User from '../user/entity/user.entity';
import Friend from '../friend/entity/friend.entity';
import UserService from '../user/user.service';
import CommentService from '../comment/comment.service';
import Comment from '../comment/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Friend, Comment])],
  providers: [PostService, PostResolver, UserService, CommentService],
  exports: [PostService],
})
export default class PostModule {}
