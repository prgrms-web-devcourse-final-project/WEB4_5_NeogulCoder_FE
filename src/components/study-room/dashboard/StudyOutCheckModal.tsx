'use client';

import { deleteMeByStudy } from '@/lib/api/community';
import { useStudiesStore } from '@/stores/useStudiesStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function StudyOutCheckModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const router = useRouter();
  const { deleteStudy } = useStudiesStore();

  const [isPending, setIsPending] = useState(false);

  const handleClickOut = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await deleteMeByStudy(studyId);
      deleteStudy(studyId);
      onClose();
      toast.success('스터디 탈퇴했습니다.');
      router.push('/');
    } catch (e) {
      console.error(e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
        <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
          <p className='mb-7 tm3 text-center'>
            정말 스터디에서 탈퇴하시겠습니까?
          </p>
          <div className='flex gap-4 justify-center'>
            <button className='button-type6 w-[120px]!' onClick={onClose}>
              취소
            </button>
            <button
              className={`button-type5 w-[120px]! bg-red! text-white! ${
                isPending ? 'cursor-not-allowed!' : ''
              }`}
              disabled={isPending}
              onClick={handleClickOut}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
