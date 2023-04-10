import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostService from './post.service';
import PostResolver from './post.resolver';
import Post from './entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export default class PostModule {}
