import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserModel {
  @Field()
  id: number;
  
  @Field()
  email: string;
}

export default UserModel;
