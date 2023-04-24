import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FriendService from './friend.service';
import { Injectable } from '@nestjs/common';
import Token from '../auth/entities/token.entity';

@Injectable()
@Resolver()
class FriendResolver {
  constructor(
    private readonly friendService: FriendService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
}

export default FriendResolver;
