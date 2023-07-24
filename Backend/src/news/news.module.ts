import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsService from './news.service';
import NewsResolver from './news.resolver';
import Post from '../post/entity/post.entity';
import Friend from '../friend/entity/friend.entity';
import PostService from '../post/post.service';
import FriendService from '../friend/friend.service';
import User from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Friend, User])],
  providers: [NewsService, NewsResolver, PostService, FriendService],
  exports: [NewsService],
})
export default class NewsModule {}
