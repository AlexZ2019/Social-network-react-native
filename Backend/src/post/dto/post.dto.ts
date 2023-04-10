import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class PostArgs {
  @Field({ nullable: true })
  media: string;
  
  @Field({ nullable: true })
  text: string;
}
