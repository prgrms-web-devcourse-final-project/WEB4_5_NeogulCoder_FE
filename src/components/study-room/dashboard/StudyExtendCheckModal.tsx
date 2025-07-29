import { participateInStudyExtension } from '@/lib/api/community';
import { toast } from 'react-toastify';

export default function StudyExtendCheckModal({
  studyId,
  onClose,
}: {
  studyId: number;
  onClose: () => void;
}) {
  const handleClickExtend = async () => {
    try {
      await participateInStudyExtension(studyId);
      onClose();
      toast.success('연장된 스터디에 참여했습니다.');
    } catch (e) {
      console.error(e);
      toast.error('오류가 발생했습니다. 다시 시도해주세요!');
    }
  };

  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
          <p className='mb-2 tm3 text-center'>
            연장된 스터디에 참가하시겠습니까?
          </p>
          <p className='mb-7 tm5 text-center text-red'>
            *연장에 참여한 후에는 취소할 수 없습니다.
          </p>
          <div className='flex gap-4 justify-center'>
            <button className='button-type6 w-[120px]!' onClick={onClose}>
              취소
            </button>
            <button
              className='button-type5 w-[120px]!'
              onClick={handleClickExtend}
            >
              참여하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
