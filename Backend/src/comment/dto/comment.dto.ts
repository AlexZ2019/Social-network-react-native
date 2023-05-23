import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class CommentArgs {
  @Field()
  postId: number;
  
  @Field()
  text: string;
}
