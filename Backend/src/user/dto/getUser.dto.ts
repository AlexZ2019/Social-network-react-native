import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class GetUserArgs {
  @Field()
  id: number;
}
