import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class DeleteArgs {
  @Field()
  id: number;
  
  @Field()
  postId: number;
}
