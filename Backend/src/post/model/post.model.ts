import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PostModel {
  @Field()
  id: number;
  
  @Field({ nullable: true })
  media: string;
  
  @Field({ nullable: true })
  text: string;
  
  @Field({ nullable: true })
  name: string;
  
  @Field({ nullable: true })
  email: string;
  
  @Field({ nullable: true })
  nickname: string;
  
  @Field({ nullable: true })
  like: number;
}

export default PostModel;
