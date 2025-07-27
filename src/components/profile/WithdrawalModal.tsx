type WithdrawalModalProps = {
  onClose: () => void;
  handleDeleteUser: () => void;
};

export default function WithdrawalModal({
  onClose,
  handleDeleteUser,
}: WithdrawalModalProps) {
  return (
    <div className='flex flex-col bg-white w-[340px] h-[170px] rounded-[10px] items-center justify-center shadow-sm gap-[35px] px-6 py-6'>
      <div className='flex flex-col justify-center items-center w-full gap-[35px]'>
        <p className='t2'>정말 탈퇴하시겠습니까?</p>
        <div className='flex gap-[22px]'>
          <button
            type='button'
            className='w-[120px] h-[45px] border border-main rounded-[6px] hover:bg-[#f5f5f5]'
            onClick={onClose}
          >
            취소
          </button>
          <button
            type='button'
            className='w-[120px] h-[45px] bg-main text-white rounded-[6px] hover:bg-[#292929]'
            onClick={handleDeleteUser}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
