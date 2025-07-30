'use client';

import { deleteMyTimeVote } from '@/lib/api/schedule';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DeleteScheduleModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickOut = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteMyTimeVote(studyId);
      toast.success('삭제되었습니다.');
      onClose();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const code = e.response?.data?.code;
        if (code === 'TVS_003') {
          toast.error('오류가 발생했습니다. 다시 시도해주세요!');
        } else {
          console.error(e);
          toast.error('오류가 발생했습니다. 다시 시도해주세요!');
        }
      } else {
        console.error('Axios 외의 오류: ', e);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
      <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
        <p className='mb-7 tm3 text-center'>
          내가 제출한 시간을 모두 지우시겠습니까?
        </p>
        <div className='flex gap-4 justify-center'>
          <button className='button-type6 w-[120px]!' onClick={onClose}>
            취소
          </button>
          <button
            className={`button-type5 w-[120px]! bg-red! text-white! ${
              isDeleting ? 'cursor-not-allowed!' : ''
            }`}
            disabled={isDeleting}
            onClick={handleClickOut}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
