export type CommentsProps = {
  postId: number | undefined;
}

export type CommentType = {
  id: number;
  postId: number;
  userId: number;
  text: string;
  like: number | null;
  name: string | null;
  nickname: string | null;
  media: string | null;
}
