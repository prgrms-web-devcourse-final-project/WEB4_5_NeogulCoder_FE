import { deleteMyTimeVote } from '@/lib/api/schedule';

export default function DeleteScheduleModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const handleClickOut = async () => {
    await deleteMyTimeVote(studyId);
    onClose();
    // toast message
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
