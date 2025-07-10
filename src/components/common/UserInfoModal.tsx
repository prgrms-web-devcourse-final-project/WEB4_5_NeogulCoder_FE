import { LogOut } from 'lucide-react';
import { User } from 'lucide-react';

export default function UserInfoModal() {
  return (
    <div className="w-[160px] h-[112px] border border-main/10 bg-white drop-shadow-2xl font-medium rounded-[5px]">
      <div className="flex">
        <LogOut className="w-5 h-5" />
        <button type="button">프로필 설정</button>
      </div>

      <div className="flex">
        <User className="w-5 h-5" />
        <button type="button">프로필 설정</button>
      </div>
    </div>
  );
}
