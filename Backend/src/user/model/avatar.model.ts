import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class AvatarModel {
  @Field()
  imageUrl: string;
}

export default AvatarModel;
