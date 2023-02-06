import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserModel {
  @Field()
  id: number;
  
  @Field()
  email: string;
  
  @Field()
  nickname: string;
}

export default UserModel;
