'use client';
import Image from 'next/image';
import logoWibby from '@/assets/images/wibby.svg';
import darkMode from '@/assets/images/dark-mode.svg';
import { ChevronDown } from 'lucide-react';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import ProfileInfoModal from '../profile/ProfileInfoModal';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleHome = () => {
    router.push('/main');
  };
  return (
    <div className="w-full flex justify-center pt-6 text-text1">
      <div className="w-full max-w-[1248px] flex items-center justify-between">
        <Image
          src={logoWibby}
          alt="로고"
          className="w-[80px] h-9 cursor-pointer"
          onClick={handleHome}
        />

        <div className="flex items-center gap-[18px]">
          <div
            className="w-[90px] h-[34px] rounded-[5px] bg-gray4 flex items-center justify-center gap-2 relative"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="tm5 cursor-pointer">내 정보</span>
            <button type="button">
              <ChevronDown className="w-[18px] h-[18px]" />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-[40px]">
                <ProfileInfoModal onClose={() => setIsOpen(false)} />
              </div>
            )}
          </div>
          <button type="button">
            <Bell className="w-[22px] h-[24px]" />
          </button>
          <button type="button">
            <Image
              src={darkMode}
              className="w-[26px] h-[26px]"
              alt="다크모드"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
