import { Field, ObjectType } from '@nestjs/graphql';
import CommentModel from './comment.model';

@ObjectType()
class CommentsModel {
  @Field()
  total: number;
  
  @Field()
  parts: number;
  
  @Field(() => [CommentModel])
  comments: CommentModel[];
}

export default CommentsModel;
