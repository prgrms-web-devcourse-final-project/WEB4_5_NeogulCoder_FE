'use client';

import { useEffect, useState } from 'react';
import Comment from '@/components/common/Comment';
import { fetchComments } from '@/lib/api/comment/fetchComments';

type CommentType = {
  id: number;
  nickname: string;
  profileImageUrl?: string;
  content: string;
  createdAt: string;
};

type CommentListProps = {
  studyId: number;
  postId: number;
};

export default function CommentList({ studyId, postId }: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchComments(studyId, postId);
        setComments(data);
      } catch (err) {
        console.error('댓글 조회 실패:', err);
      }
    };

    load();
  }, [studyId, postId]);

  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          nickname={comment.nickname}
          profileImageUrl={comment.profileImageUrl}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
    </div>
  );
}
