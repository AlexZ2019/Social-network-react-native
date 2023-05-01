import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class UsersArgs {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  pageSize: number;
  
  @Field({ nullable: true })
  searchValue: string;
}
