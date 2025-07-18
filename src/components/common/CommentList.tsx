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
  target: 'study' | 'recruitment';
  studyId: number;
  postId: number;
};

export default function CommentList({
  target,
  studyId,
  postId,
}: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        let data;

        if (target === 'study' && studyId !== undefined) {
          data = await fetchComments({ target: 'study', studyId, postId });
        } else if (target === 'recruitment') {
          data = await fetchComments({ target: 'recruitment', postId });
        }

        if (data) setComments(data);
      } catch (err) {
        console.error('댓글 조회 실패:', err);
      }
    };

    load();
  }, [target, studyId, postId]);

  return (
    // comment가 없을 때의 코드 추가하기
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
