import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from './entity/comment.entity';

@Injectable()
class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getComments(postId, part = 1, size = 10) {
    const lastItemCount = part * size;
    const skip = lastItemCount - size;
    const [result, total] = await this.commentRepository.findAndCount({
      where: postId,
      skip,
      take: size,
      order: { created_at: 'DESC' },
    });
    if (result.length) {
      return {
        comments: result,
        total,
        parts: Math.ceil(total / size),
      };
    } else {
      return {
        total: 0,
        parts: 0,
        comments: [],
      };
    }
  }

  async createComment(comment) {
    await this.commentRepository.insert(comment);
  }

  async editComment(userId, comment) {
    await this.commentRepository.update({ id: comment.id, userId }, comment);
  }

  async deleteComment(id: number) {
    await this.commentRepository.delete({ id });
  }

  async deleteAllPostComments(postId: number) {
    await this.commentRepository.delete({ postId });
  }
}

export default CommentService;
