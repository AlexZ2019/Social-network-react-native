import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class User extends BaseEntity {
  @Column()
  email: string;
  
  @Column()
  nickname: string;
  
  @Column()
  password: string;
  
  @Column()
  biography: string;
  
  @Column()
  birthday: string;
  
  @Column()
  status: string;
}
