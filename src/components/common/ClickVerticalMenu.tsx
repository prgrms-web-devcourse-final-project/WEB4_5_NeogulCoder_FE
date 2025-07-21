import { PencilLine, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type MenuProps = {
  title?: string;
  recruitmentPostId?: number;
};

export default function ClickVerticalMenu({
  title,
  recruitmentPostId,
}: MenuProps) {
  const router = useRouter();
  const handleGoToModify = () => {
    router.push(`/recruitment/modify/${recruitmentPostId}`);
  };

  return (
    <>
      <div className='absolute right-0 mt-2 w-[160px] border border-main/10 bg-white rounded-md shadow-lg overflow-hidden tm3 z-3'>
        <div className='gap-3 px-4 py-3'>
          <span className='text-[#b2b2b2] tm5'>{`${title}`}</span>
        </div>
        {title === '내 게시물' && (
          <button
            type='button'
            onClick={handleGoToModify}
            className='flex gap-3 px-4 py-3 w-full hover:bg-gray4 tm5'
          >
            <PencilLine className='w-4 h-4' />
            수정하기
          </button>
        )}
        {title === '내 댓글' && (
          <button
            type='button'
            className='flex gap-3 px-4 py-3 w-full hover:bg-gray4 tm5'
          >
            <PencilLine className='w-4 h-4' />
            수정하기
          </button>
        )}
        <div className='h-px bg-gray4' />

        <button
          type='button'
          className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray4 text-[#ff5955] tm5'
        >
          <Trash2 className='w-4 h-4' color='#ff5955' />
          삭제하기
        </button>
      </div>
    </>
  );
}
