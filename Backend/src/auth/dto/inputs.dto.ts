import { ArgsType, Field, InputType } from '@nestjs/graphql';
import UserArgs from '../../user/dto/user.dto';
import { IsEmail } from 'class-validator';

@InputType()
@ArgsType()
export default class AuthArgs extends UserArgs {
  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  password: string;
}
