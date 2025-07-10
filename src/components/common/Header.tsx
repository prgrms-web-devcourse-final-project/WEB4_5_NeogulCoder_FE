import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import darkMode from '@/assets/images/dark-mode.svg';
import { ChevronDown } from 'lucide-react';
import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <div className="w-full flex justify-center pt-6 text-text1">
      <div className="w-[1248px] flex items-center justify-between pl-5 pr-[10px]">
        <Image src={logoWibby} alt="로고" className="h-9" />

        <div className="flex items-center gap-6">
          <div className="w-[100px] h-[38px] rounded-[5px] bg-gray4 flex items-center justify-center pl-[10px] pr-[10px] gap-3">
            <p className="font-medium">내 정보</p>
            <button type="button">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <button type="button">
            <Bell className="w-7 h-[30px]" />
          </button>
          <button type="button">
            <Image
              src={darkMode}
              className="w-[34px] h-[34px]"
              alt="다크모드"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
