import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { Like, Not, Repository } from 'typeorm';
import { IUserData } from './types';
import AuthArgs from '../auth/dto/inputs.dto';
import Friend from '../friend/entity/friend.entity';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async getUserByEmailWithPassword(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    const { password, ...restUser } = user;
    return restUser;
  }

  async getUsers(searchValue = '', page = 1, pageSize = 10, userId) {
    const lastItemCount = page * pageSize;
    const skip = lastItemCount - pageSize;
    const [result, total] = await this.userRepository.findAndCount({
      where: searchValue
        ? [
          { email: Like(`${searchValue}%`) },
          { nickname: Like(`${searchValue}%`) },
        ]
        : { id: Not(userId) },
      skip,
      take: pageSize,
    });
    const friends = await this.friendRepository.findBy([
      { user1: userId },
      { user2: userId },
    ]);

    return {
      users: result.reduce((users, user: User) => {
        const { password, ...restUser } = user;
        const friendship = friends.find(
          (friend) => user.id === friend.user1 || user.id === friend.user2,
        );
        return [...users, { ...restUser, isFriend: !!friendship }];
      }, []),
      total,
      pages: Math.ceil(total / pageSize),
    };
  }
  
  async updateUser(userData: IUserData, userId: number) {
    await this.userRepository.update({ id: userId }, { ...userData });
  }
  
  async createUser(user: AuthArgs) {
    const existedUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existedUser) throw new Error('User with this email exists');
    return this.userRepository.insert(user);
  }
  
  async createGoogleUser(email) {
    return this.userRepository.insert({ email });
  }
  
  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const { password, ...restUser } = user;
    return restUser;
  }
}

export default UserService;
