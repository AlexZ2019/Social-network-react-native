import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import NewsService from './news.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import PostsModel from '../post/model/posts.model';
import GetNewsDto from './dto/news.dto';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class NewsResolver {
  constructor(private readonly newsService: NewsService) {}
  
  @Query(() => PostsModel)
  async getNews(
    @Context() context,
    @Args() args: GetNewsDto,
  ): Promise<PostsModel> {
    return this.newsService.getNews(
      context.req.user.id,
      args.page,
      args.pageSize,
    );
  }
}

export default NewsResolver;
