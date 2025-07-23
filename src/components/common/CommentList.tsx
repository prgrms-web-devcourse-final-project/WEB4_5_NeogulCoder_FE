'use client';

import Comment from '@/components/common/Comment';

type CommentType = {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  content: string;
  createdAt: string;
  commentId: number;
};

type CommentListProps = {
  comments: CommentType[];
  studyId?: number;
  postId: number;
};

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <p className='text-gray-500'>아직 댓글이 없습니다.</p>;
  }

  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          userId={comment.userId}
          nickname={comment.nickname}
          profileImageUrl={comment.profileImageUrl}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
    </div>
  );
}
