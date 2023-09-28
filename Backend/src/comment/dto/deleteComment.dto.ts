import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class DeleteCommentArgs {
  @Field()
  id: number;
  
  @Field()
  postId: number;
}
