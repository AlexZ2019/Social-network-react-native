import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class CommentModel {
  @Field()
  id: number;
  
  @Field()
  postId: number;
  
  @Field()
  userId: number;
  
  @Field()
  text: string;
  
  @Field({ nullable: true })
  like: number;
}

export default CommentModel;
