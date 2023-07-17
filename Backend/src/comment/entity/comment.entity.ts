import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class Comment extends BaseEntity {
  @Column()
  userId: number;
  
  @Column()
  postId: number;
  
  @Column()
  text: string;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  nickname: string;
  
  @Column()
  like: number;
  
}
