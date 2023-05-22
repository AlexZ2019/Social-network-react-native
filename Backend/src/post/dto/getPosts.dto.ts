import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class GetPostsDto {
  @Field({ nullable: true })
  userId: number;
  
  @Field({ nullable: true })
  page: number;
  
  @Field({ nullable: true })
  pageSize: number;
}
