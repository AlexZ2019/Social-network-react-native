import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class Post extends BaseEntity {
  @Column()
  userId: number;

  @Column()
  media: string;

  @Column()
  text: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  like: number;
}
