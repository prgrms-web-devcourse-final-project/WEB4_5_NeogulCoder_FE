import { PencilLine, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteRecruitmentPost } from '@/lib/api/recruitment/delete';
import { deleteStudyPost } from '@/lib/api/study/delete';
import { toast } from 'react-toastify';

type MenuProps = {
  title?: string;
  target?: string;
  recruitmentPostId?: number;
  postId?: number;
  studyId?: number;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export default function ClickVerticalMenu({
  title,
  target,
  recruitmentPostId,
  postId,
  studyId,
  onEditClick,
  onDeleteClick,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleGoToModify = () => {
    router.push(`/recruitment/modify/${recruitmentPostId}`);
  };
  const handleGoToModifyStudy = () => {
    router.push(`/study/${studyId}/study-community/modify/${postId}`);
  };
  return (
    <>
      <div className='absolute right-0 mt-2 w-[160px] border border-main/10 bg-white rounded-md shadow-lg overflow-hidden tm3 z-3'>
        <div className='gap-3 px-4 py-3'>
          <span className='text-[#b2b2b2] tm5'>{`${title}`}</span>
        </div>
        {(title === '내 게시물' || title === '내 댓글') && (
          <button
            type='button'
            onClick={
              title === '내 게시물' && target === 'recruitment'
                ? handleGoToModify
                : title === '내 게시물' && target === 'study'
                ? handleGoToModifyStudy
                : onEditClick
            }
            className='flex gap-3 px-4 py-3 w-full hover:bg-gray4 tm5'
          >
            <PencilLine className='w-4 h-4' />
            수정하기
          </button>
        )}
        <div className='h-px bg-gray4' />
        {(title === '내 게시물' || title === '내 댓글') && (
          <button
            type='button'
            onClick={
              title === '내 게시물' ? () => setIsOpen(true) : onDeleteClick
            }
            className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4 text-[#ff5955] tm5'
          >
            <Trash2 className='w-4 h-4' color='#ff5955' />
            삭제하기
          </button>
        )}
      </div>
      {isOpen && (
        <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
          <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
            <p className='mb-7 tm3'>정말 삭제하시겠습니까?</p>
            <div className='flex gap-4 justify-center'>
              <button
                className='button-type6 w-[120px]!'
                onClick={() => setIsOpen(false)}
              >
                취소
              </button>
              <button
                className='button-type5 w-[120px]! bg-red! text-white!'
                onClick={async () => {
                  if (target === 'recruitment') {
                    await deleteRecruitmentPost(recruitmentPostId);
                    toast.success('게시글 삭제가 완료되었습니다!');
                    router.push('/');
                  } else if (target === 'study') {
                    await deleteStudyPost(postId);
                    toast.success('게시글 삭제가 완료되었습니다!');
                    router.push(`/study/${studyId}/study-community`);
                  } else {
                    console.log('target error');
                  }
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
