import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class CommentsArgs {
  @Field()
  postId: number;
  
  @Field({ nullable: true })
  part: number;
  
  @Field({ nullable: true })
  size: number;
}
