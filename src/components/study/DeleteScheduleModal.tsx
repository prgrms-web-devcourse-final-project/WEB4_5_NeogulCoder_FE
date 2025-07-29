import { deleteMyTimeVote } from '@/lib/api/schedule';
import { toast } from 'react-toastify';

export default function DeleteScheduleModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const handleClickOut = async () => {
    try {
      const data = await deleteMyTimeVote(studyId);
      if (data.code === 'TVS_003') {
        throw new Error('통계 처리 중 에러 발생');
      }
      toast.success('삭제되었습니다.');
      onClose();
    } catch (e) {
      console.error(e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    }
  };

  return (
    <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
      <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
        <p className='mb-7 tm3 text-center'>
          내가 제출한 시간을 모두 지우시겠습니까?
        </p>
        <div className='flex gap-4 justify-center'>
          <button className='button-type6 w-[120px]!' onClick={onClose}>
            취소
          </button>
          <button
            className='button-type5 w-[120px]! bg-red! text-white!'
            onClick={handleClickOut}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
