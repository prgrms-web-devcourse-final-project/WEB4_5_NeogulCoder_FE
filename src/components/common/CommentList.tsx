'use client';

import Comment from '@/components/common/Comment';
import { useState, useEffect } from 'react';

type CommentType = {
  commentId: number;
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  content: string;
  createdAt: string;
};

type CommentListProps = {
  comments: CommentType[];
  postId: number;
  target: string;
};

export default function CommentList({
  comments: initialComments,
  target,
}: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleUpdate = (commentId: number, updatedContent: string) => {
    if (updatedContent === '') {
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } else {
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === commentId ? { ...c, content: updatedContent } : c
        )
      );
    }
  };

  // 이 메세지는 보여줄 지 말지 고민
  // if (!comments || comments.length === 0) {
  //   return <p className='text-gray-500'>아직 댓글이 없습니다.</p>;
  // }

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
          onUpdate={handleUpdate}
          target={target}
        />
      ))}
    </div>
  );
}
