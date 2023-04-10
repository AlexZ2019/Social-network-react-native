import { ArgsType, Field, InputType } from '@nestjs/graphql';
import PostArgs from './post.dto';

@InputType()
@ArgsType()
export default class EditPostArgs extends PostArgs {
  @Field({ nullable: true })
  id: number;
}
