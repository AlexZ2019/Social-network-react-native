import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from './user.service';
import UserResolver from './user.resolver';
import { Token } from '../auth/entities/token.entity';
import User from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export default class UserModule {}
