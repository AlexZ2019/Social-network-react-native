import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class TokenArgs {
  @Field()
  token: string;
}
