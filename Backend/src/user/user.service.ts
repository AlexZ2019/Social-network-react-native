import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { Like, Repository } from 'typeorm';
import { IUserData } from './types';
import AuthArgs from '../auth/dto/inputs.dto';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async getUserByEmailWithPassword(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    const { password, ...restUser } = user;
    return restUser;
  }
  
  async getUsers(nickname = '', page = 1, pageSize = 10) {
    const lastItemCount = page * pageSize;
    const skip = lastItemCount - pageSize;
    const [result, total] = await this.userRepository.findAndCount({
      where: nickname && { nickname: Like('%' + nickname + '%') },
      skip,
      take: pageSize,
    });
    return {
      users: result.map((user: User) => {
        const { password, ...restUser } = user;
        return restUser;
      }),
      total,
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
}

export default UserService;
