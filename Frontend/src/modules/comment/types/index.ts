export type CommentsProps = {
  postId: number;
}

export type CommentType = {
  id: number;
  postId: number;
  userId: number;
  text: string;
  like: number | null;
  name: string | null;
  email: string;
  nickname: string | null;
  media: string | null;
}
