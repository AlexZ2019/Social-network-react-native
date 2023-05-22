import { Field, ObjectType } from '@nestjs/graphql';
import PostModel from './post.model';

@ObjectType()
class PostsModel {
  @Field()
  total: number;
  
  @Field()
  pages: number;
  
  @Field(() => [PostModel])
  posts: PostModel[];
}

export default PostsModel;
