import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  
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
