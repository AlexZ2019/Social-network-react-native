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
  
  @Column()
  sex: string;
  
  @Column()
  firstname: string;
  
  @Column()
  lastname: string;
  
  @Column({ nullable: true })
  image?: string;
  
  @Column({ nullable: true })
  imagepath?: string;
}
