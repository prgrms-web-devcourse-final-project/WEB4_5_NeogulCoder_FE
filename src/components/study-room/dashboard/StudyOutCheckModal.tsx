'use client';

import { deleteMeByStudy } from '@/lib/api/community';
import { useStudiesStore } from '@/stores/useStudiesStore';

export default function StudyOutCheckModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const { deleteStudy } = useStudiesStore();

  const handleClickOut = async () => {
    await deleteMeByStudy(studyId);
    deleteStudy(studyId);
    onClose();
    // 메인으로 리다이렉트 ?
    // toast message
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
              className='button-type5 w-[120px]! bg-red! text-white!'
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
