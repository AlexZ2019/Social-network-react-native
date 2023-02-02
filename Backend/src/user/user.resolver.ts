import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../auth/entities/token.entity';
import { Repository } from 'typeorm';
import UserService from './user.service';

@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  
}

export default UserResolver;
