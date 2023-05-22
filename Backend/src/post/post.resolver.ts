import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import PostService from './post.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import PostModel from './model/post.model';
import PostArgs from './dto/post.dto';
import EditPostArgs from './dto/editPost.dto';
import DeletePostArgs from './dto/deletePost.dto';
import GetPostsDto from './dto/getPosts.dto';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class PostResolver {
  constructor(private readonly postService: PostService) {}
  
  @Query(() => [PostModel])
  async getUserPosts(
    @Context() context,
    @Args() args: GetPostsDto,
  ): Promise<PostModel[]> {
    const posts = await this.postService.getUserPosts(
      args?.userId || context.req.user.id,
    );
    if (posts.length) {
      return posts;
    } else {
      return [];
    }
  }
  
  @Mutation(() => Boolean)
  async createPost(@Args() post: PostArgs, @Context() context) {
    await this.postService.createPost({ ...post, userId: context.req.user.id });
    return true;
  }
  
  @Mutation(() => Boolean)
  async editPost(@Args() post: EditPostArgs, @Context() context) {
    await this.postService.editPost(context.req.user.id, post);
    return true;
  }
  
  @Mutation(() => Boolean)
  async deletePost(@Args() args: DeletePostArgs, @Context() context) {
    await this.postService.deletePost(args.id, context.req.user.id);
    return true;
  }
}

export default PostResolver;
