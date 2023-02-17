import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserModel {
  @Field()
  id: number;
  
  @Field()
  email: string;
  
  @Field()
  nickname: string;
  
  @Field({ nullable: true })
  birthday: string | null;
  
  @Field({ nullable: true })
  status: string | null;
  
  @Field({ nullable: true })
  biography: string | null;
}

export default UserModel;
