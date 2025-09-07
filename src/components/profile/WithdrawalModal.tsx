import { Info, X } from 'lucide-react';

type WithdrawalModalProps = {
  onClose: () => void;
  handleDeleteUser: () => void;
};

export default function WithdrawalModal({
  onClose,
  handleDeleteUser,
}: WithdrawalModalProps) {
  return (
    <div className='flex flex-col bg-white w-screen h-screen lg:w-[340px] lg:h-[170px] lg:rounded-[10px] lg:items-center lg:justify-center shadow-sm gap-[35px] px-6 py-6'>
      <div className='flex flex-col lg:justify-center lg:items-center w-full gap-[40px] lg:gap-[35px]'>
        <div className='relative flex items-center justify-center w-full lg:hidden'>
          <p className='text-center'>회원 탈퇴</p>
          <X
            className='w-6 h-6 absolute right-0 cursor-pointer'
            onClick={onClose}
          />
        </div>
        <div className='flex items-center text-gray-500 lg:text-black'>
          <Info className='w-4 h-4 lg:hidden' />
          <p className='t2 ml-2'>정말 탈퇴하시겠습니까?</p>
        </div>
        <div className='flex gap-[22px]'>
          <button
            type='button'
            className='w-[120px] h-[45px] border border-main rounded-[6px] hover:bg-[#f5f5f5] hidden lg:block'
            onClick={onClose}
          >
            취소
          </button>
          <button
            type='button'
            className='w-full lg:w-[120px] h-[45px] bg-main text-white rounded-[6px] hover:bg-[#292929]'
            onClick={handleDeleteUser}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
