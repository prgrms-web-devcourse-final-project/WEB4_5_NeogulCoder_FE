import { writeComment } from '@/lib/api/comment/write';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CommentWriteProps = {
  target: 'recruitment' | 'study';
  postId: number;
  profileImageUrl: string;
  commentCount: number;
};

export default function WriteComment({
  target,
  profileImageUrl,
  commentCount,
  postId,
}: CommentWriteProps) {
  const [comment, setComment] = useState('');
  const router = useRouter();
  const handleGoToPr = () => {
    router.push('/profile/pr');
  };

  const handleSubmit = async () => {
    try {
      await writeComment(`${target}`, {
        postId,
        content: comment,
      });
      setComment('');
      router.refresh(); // 댓글 새로고침
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  return (
    <>
      <div className='flex w-full'>
        <div className='flex flex-col w-full'>
          <div className='flex'>
            <span className='tb2 mr-1' style={{ color: 'var(--color-text1)' }}>
              댓글
            </span>
            <span
              className='tb2 opacity-50 '
              style={{ color: 'var(--color-text1)' }}
            >
              {commentCount}
            </span>
          </div>
          <div className='w-full flex my-8'>
            <div>
              <button
                className='w-[50px] h-[50px] rounded-full bg-gray-300 shrink-0'
                onClick={handleGoToPr}
              >
                {profileImageUrl}
              </button>
            </div>
            <input
              className='w-full h-[50px]  rounded-xl border-[1px] p-5 ml-5 border-[#B8B8B8] tb-4'
              placeholder='댓글을 입력해주세요'
              onChange={(e) => setComment(e.target.value)}
              style={{
                color: 'var(--color-text1)',
              }}
            ></input>
          </div>
          <div className='flex justify-end mb-10'>
            <button
              className='button-type5 color-[#ffffff] hover:bg-[#292929]'
              onClick={handleSubmit}
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
