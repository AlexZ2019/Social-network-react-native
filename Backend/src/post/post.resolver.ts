import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import PostService from './post.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import PostArgs from './dto/post.dto';
import EditPostArgs from './dto/editPost.dto';
import GetPostsDto from './dto/getPosts.dto';
import PostsModel from './model/posts.model';
import DeleteArgs from '../common/dto/delete.dto';
import UserService from '../user/user.service';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  
  @Query(() => PostsModel)
  async getUserPosts(
    @Context() context,
    @Args() args: GetPostsDto,
  ): Promise<PostsModel> {
    return this.postService.getUserPosts(
      args?.userId || context.req.user.id,
      args.page,
      args.pageSize,
    );
  }
  
  @Mutation(() => Boolean)
  async createPost(@Args() post: PostArgs, @Context() context) {
    const user = await this.userService.getUserById(context.req.user.id);
    await this.postService.createPost({
      ...post,
      userId: context.req.user.id,
      name: `${user.firstname} ${user.lastname}` || null,
      nickname: user.nickname || null,
    });
    return true;
  }
  
  @Mutation(() => Boolean)
  async editPost(@Args() post: EditPostArgs, @Context() context) {
    await this.postService.editPost(context.req.user.id, post);
    return true;
  }
  
  @Mutation(() => Boolean)
  async deletePost(@Args() args: DeleteArgs, @Context() context) {
    await this.postService.deletePost(args.id, context.req.user.id);
    return true;
  }
}

export default PostResolver;
