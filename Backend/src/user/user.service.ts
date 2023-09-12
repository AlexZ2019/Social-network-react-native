import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { Like, Not, Repository } from 'typeorm';
import { IUserData } from './types';
import AuthArgs from '../auth/dto/inputs.dto';
import Friend from '../friend/entity/friend.entity';
import * as Upload from 'graphql-upload/Upload';
import axios from 'axios';
import * as FormData from 'form-data';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly configService: ConfigService,
  ) {}
  
  async getUserByEmailWithPassword(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    const { password, ...restUser } = user;
    return restUser;
  }
  
  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
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
  
  async uploadUserAvatar(userId: number, image: Upload) {
    const file = await image;
    const filePath = join(__dirname, `../../src/user/uploads/${file.filename}`);
    await new Promise((resolve, reject) => {
      file.createReadStream().
        pipe(fs.createWriteStream(filePath)).
        on('finish', () => {
          resolve(true);
        }).
        on('error', (error) => {
          console.log('IMAGE_UPLOAD_ERROR', error);
          reject(false);
        });
    });
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    const { data } = await axios.post(
      `${this.configService.get('FILES_CLOUD_URL')}uploads/form_data`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get(
            'FILES_CLOUD_AUTH_PUBLIC_TOKEN',
          )}`,
        },
      },
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    const user = await this.getUserById(userId);
    await this.userRepository.update(
      { id: userId },
      { image: data.files[0].fileUrl, imagepath: data.files[0].filePath },
    );
    if (user.image && user.imagepath) {
      await axios.delete(
        `${this.configService.get('FILES_CLOUD_URL')}files?filePath=${
          user.imagepath
        }`,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get(
              'FILES_CLOUD_AUTH_SECRET_TOKEN',
            )}`,
          },
        },
      );
    }
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
