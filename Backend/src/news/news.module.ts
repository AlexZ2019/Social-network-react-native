import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsService from './news.service';
import NewsResolver from './news.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [NewsService, NewsResolver],
  exports: [NewsService],
})
export default class NewsModule {}
