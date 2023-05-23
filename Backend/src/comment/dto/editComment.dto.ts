import { ArgsType, Field, InputType } from '@nestjs/graphql';
import CommentArgs from './comment.dto';

@InputType()
@ArgsType()
export default class EditCommentArgs extends CommentArgs {
  @Field()
  id: number;
}
