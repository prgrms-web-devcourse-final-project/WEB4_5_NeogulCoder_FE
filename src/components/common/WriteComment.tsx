import { writeComment } from '@/lib/api/comment/write';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import basicBunny from '@/assets/images/basic-bunny.svg';

type CommentWriteProps = {
  target: 'recruitment' | 'study';
  postId: number;
  userId: number | undefined;
  profileImageUrl: string | null | undefined;
  commentCount: number;
  onCommentAdd?: () => void;
};

export default function WriteComment({
  target,
  userId,
  profileImageUrl,
  commentCount,
  postId,
  onCommentAdd,
}: CommentWriteProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleGoToPr = () => {
    router.push(`/profile/pr/${userId}`);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await writeComment(`${target}`, {
        postId,
        content: comment,
      });
      onCommentAdd?.();
      setComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
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
                className='w-[50px] h-[50px] rounded-full bg-gray-300 shrink-0 relative overflow-hidden'
                onClick={handleGoToPr}
              >
                <Image
                  src={profileImageUrl ?? basicBunny.src}
                  width={50}
                  height={50}
                  alt='예시 기본 프사'
                  className='absolute inset-0 w-full h-full object-cover object-center'
                />
              </button>
            </div>

            <input
              className='w-full h-[50px]  rounded-xl border-[1px] p-5 ml-5 border-[#B8B8B8] tb-4'
              placeholder='댓글을 입력해주세요'
              value={comment}
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
              disabled={isSubmitting}
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
