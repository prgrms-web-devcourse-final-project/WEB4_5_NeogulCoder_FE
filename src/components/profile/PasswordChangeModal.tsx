import { X } from 'lucide-react';

export default function PasswordChangeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col bg-white w-110 h-130 rounded-[10px] items-center justify-center shadow-lg gap-[35px] px-6 py-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="tm2">비밀번호 변경하기</h2>
        <X className="w-6 h-6 opacity-50 cursor-pointer" onClick={onClose} />
      </div>

      <div className="w-full">
        <p className="pb-2 tm4">현재 비밀번호</p>
        <input
          type="password"
          placeholder="현재 비밀번호를 입력해주세요"
          className="input-type3 w-full focus:outline-2 focus:outline-main"
        />
      </div>

      <div className="w-full">
        <p className="pb-2 tm4">새 비밀번호</p>
        <input
          type="password"
          placeholder="새 비밀번호를 입력해주세요"
          className="input-type3 w-full focus:outline-2 focus:outline-main"
        />
      </div>

      <div className="w-full">
        <p className="pb-2 tm4">새 비밀번호 확인</p>
        <input
          type="password"
          placeholder="새 비밀번호를 다시 한 번 입력해주세요"
          className="input-type3 w-full focus:outline-2 focus:outline-main"
        />
      </div>
      <div className="w-full">
        <button
          type="button"
          className="w-full h-[50px] bg-main text-white rounded-[6px]"
        >
          변경
        </button>
      </div>
    </div>
  );
}
