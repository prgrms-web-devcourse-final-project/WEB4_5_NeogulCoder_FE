export default function StudyDeleteCheckModal({
  checkModalClose,
  fetchDeleteStudy,
  isPending,
}: {
  checkModalClose: () => void;
  fetchDeleteStudy: () => void;
  isPending: boolean;
}) {
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-15 flex items-center justify-center'>
        <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
          <p className='mb-7 tm3'>스터디를 삭제합니다. 되돌릴 수 없습니다.</p>
          <div className='flex gap-4 justify-center'>
            <button
              className='button-type6 !w-[120px]'
              onClick={checkModalClose}
              disabled={isPending}
            >
              취소
            </button>
            <button
              onClick={fetchDeleteStudy}
              className='button-type5 red !w-[120px]'
              disabled={isPending}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
