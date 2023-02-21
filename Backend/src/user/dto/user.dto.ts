import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class UserArgs {
  @Field({ nullable: true })
  nickname: string;
  
  @Field({ nullable: true })
  birthday: string | null;
  
  @Field({ nullable: true })
  status: string | null;
  
  @Field({ nullable: true })
  biography: string | null;
}
