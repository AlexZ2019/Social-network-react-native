import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserModel {
  @Field()
  id: number;
  
  @Field()
  email: string;
  
  @Field()
  nickname: string;
  
  @Field()
  birthday: string;
  
  @Field()
  status: string;
  
  @Field()
  biography: string;
}

export default UserModel;
