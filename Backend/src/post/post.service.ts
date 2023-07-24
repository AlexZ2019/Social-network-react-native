import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entity/post.entity';

@Injectable()
class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async getUserPosts(userId, page = 1, pageSize = 10) {
    const lastItemCount = page * pageSize;
    const skip = lastItemCount - pageSize;
    const [result, total] = await this.postRepository.findAndCount({
      where: { userId },
      skip,
      take: pageSize,
      order: { created_at: 'DESC' },
    });
    if (result.length) {
      return {
        posts: result,
        total,
        pages: Math.ceil(total / pageSize),
      };
    } else {
      return {
        total: 0,
        pages: 0,
        posts: [],
      };
    }
  }
  
  async getPostById(postId) {
    return this.postRepository.findOneBy({ id: postId });
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
