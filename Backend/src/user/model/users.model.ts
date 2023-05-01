import { Field, ObjectType } from '@nestjs/graphql';
import UserModel from './user.model';

@ObjectType()
class UsersModel {
  @Field()
  total: number;
  
  @Field()
  pages: number;
  
  @Field(() => [UserModel])
  users: UserModel[];
}

export default UsersModel;
