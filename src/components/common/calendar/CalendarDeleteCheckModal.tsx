import { useState } from 'react';

export default function CalendarDeleteCheckModal({
  closeModal,
  handleDelete,
}: {
  closeModal: () => void;
  handleDelete: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center'>
        <div className='pt-10 pb-8 px-9 rounded-[10px] bg-white drop-shadow-md'>
          <p className='mb-7 tm3'>정말 일정을 삭제하시겠습니까?</p>
          <div className='flex gap-4 justify-center'>
            <button onClick={closeModal} className='button-type6 !w-[120px]'>
              취소
            </button>
            <button
              onClick={handleConfirmDelete}
              className='button-type5 w-[120px]! bg-red! text-white! disabled:!bg-gray3'
              disabled={loading}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
