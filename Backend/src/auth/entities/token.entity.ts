import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  userId: number;
  
  @Column()
  accessToken: string;
  
  @Column()
  refreshToken: string;
}
