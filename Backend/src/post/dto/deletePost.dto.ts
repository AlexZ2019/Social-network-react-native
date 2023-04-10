import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class DeletePostArgs {
  @Field({ nullable: true })
  id: number;
}
