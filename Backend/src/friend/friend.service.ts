import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/friend.entity';
import { Repository } from 'typeorm';
import Friend from './entity/friend.entity';

@Injectable()
class FriendService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}
}

export default FriendService;
