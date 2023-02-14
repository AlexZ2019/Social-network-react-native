import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class Token extends BaseEntity {
  @Column()
  userId: number;
  
  @Column()
  accessToken: string;
  
  @Column()
  refreshToken: string;
}
