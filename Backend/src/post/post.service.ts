import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entity/post.entity';

@Injectable()
class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  
  async getUserPosts(userId: number) {
    return this.postRepository.findBy({ userId });
  }
  
  async createPost(post) {
    await this.postRepository.insert(post);
  }
  
  async editPost(userId, post) {
    await this.postRepository.update({ id: post.id, userId }, post);
  }
  
  async deletePost(id: number, userId: number) {
    await this.postRepository.delete({ id, userId });
  }
}

export default PostService;
