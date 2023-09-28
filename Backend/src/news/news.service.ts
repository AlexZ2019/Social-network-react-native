import { Injectable } from '@nestjs/common';
import FriendService from '../friend/friend.service';
import PostService from '../post/post.service';

@Injectable()
class NewsService {
  constructor(
    private readonly postService: PostService,
    private readonly friendService: FriendService,
  ) {}
  
  async getNews(userId: number, part = 1, partSize = 10) {
    const friendsIds = await this.friendService.getFriendsIds(userId);
    return this.postService.getPostsByUserIds(friendsIds, part, partSize);
  }
}

export default NewsService;
