import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class Friend extends BaseEntity {
  @Column()
  user1: number;
  
  @Column()
  user2: number;
}
