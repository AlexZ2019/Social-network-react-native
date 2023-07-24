import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import CommentService from './comment.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import EditPostArgs from './dto/editComment.dto';
import GetCommentsDto from './dto/getComments.dto';
import CommentsModel from './model/comments.model';
import CommentArgs from './dto/comment.dto';
import DeleteArgs from '../common/dto/delete.dto';
import UserService from '../user/user.service';
import PostService from '../post/post.service';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => CommentsModel)
  async getComments(
    @Context() context,
    @Args() args: GetCommentsDto,
  ): Promise<CommentsModel> {
    return this.commentService.getComments(args?.postId, args.part, args.size);
  }
  
  @Mutation(() => Boolean)
  async createComment(@Args() comment: CommentArgs, @Context() context) {
    const user = await this.userService.getUserById(context.req.user.id);
    await this.commentService.createComment({
      ...comment,
      userId: context.req.user.id,
      name:
        user.firstname && user.lastname
          ? `${user.firstname} ${user.lastname}`
          : null,
      nickname: user.nickname || null,
      email: user.email,
    });
    return true;
  }
  
  @Mutation(() => Boolean)
  async editComment(@Args() comment: EditPostArgs, @Context() context) {
    await this.commentService.editComment(context.req.user.id, comment);
    return true;
  }
  
  @Mutation(() => Boolean)
  async deleteComment(@Args() args: DeleteArgs, @Context() context) {
    const post = await this.postService.getPostById(args.postId);
    if (post.userId === context.req.user.id) {
      await this.commentService.deleteComment(args.id);
      return true;
    } else {
      return false;
    }
  }
}

export default CommentResolver;
