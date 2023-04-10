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
}
