import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PostModel {
  @Field()
  id: number;
  
  @Field({ nullable: true })
  media: string;
  
  @Field({ nullable: true })
  text: string;
}

export default PostModel;
