import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
@ArgsType()
export default class UserArgs {
  @Field()
  @IsEmail()
  email: string;
  
  @Field({ nullable: true })
  nickname: string;
  
  @Field({ nullable: true })
  birthday: string | null;
  
  @Field({ nullable: true })
  status: string | null;
  
  @Field({ nullable: true })
  biography: string | null;
  
  @Field({ nullable: true })
  sex: string;
}
