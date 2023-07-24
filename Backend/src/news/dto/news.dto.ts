import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class GetNewsDto {
  @Field({ nullable: true })
  page: number;
  
  @Field({ nullable: true })
  pageSize: number;
}
