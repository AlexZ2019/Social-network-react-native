import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import Friend from './entity/friend.entity';
import User from '../user/entity/user.entity';

@Injectable()
class FriendService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}
  
  async getFriends(userId: number, searchValue = '', page = 1, pageSize = 10) {
    const friends = await this.friendRepository.findBy([
      { user1: userId },
      { user2: userId },
    ]);
    const friendIds = friends.reduce((ids, id) => {
      if (id.user1 !== userId) {
        return [...ids, id.user1];
      }
      if (id.user2 !== userId) {
        return [...ids, id.user2];
      }
    }, []);
    const lastItemCount = page * pageSize;
    const skip = lastItemCount - pageSize;
    const [result, total] = await this.userRepository.findAndCount({
      where: [
        { id: In(friendIds), email: Like(`%${searchValue}%`) },
        { id: In(friendIds), nickname: Like(`%${searchValue}%`) },
      ],
      skip,
      take: pageSize,
    });
    
    return {
      users: result.map((user) => {
        return { ...user, isFriend: true };
      }),
      total,
      pages: Math.ceil(total / pageSize),
    };
  }
}

export default FriendService;
