import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class UsersArgs {
  @Field({ nullable: true })
  page: number;
  
  @Field({ nullable: true })
  pageSize: number;
  
  @Field({ nullable: true })
  nickname: string;
  
  @Field({ nullable: true })
  email: number;
}
