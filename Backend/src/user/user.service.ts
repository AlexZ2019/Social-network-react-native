import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { Repository } from 'typeorm';
import { IUserData } from './types';

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
  
  async updateUser(userData: IUserData, userId: number) {
    await this.userRepository.update({ id: userId }, { ...userData });
  }
}

export default UserService;
