import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentService from './comment.service';
import CommentResolver from './comment.resolver';
import Comment from './entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export default class CommentModule {}
