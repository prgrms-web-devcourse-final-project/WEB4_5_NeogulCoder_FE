'use client';
import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { useRouter } from 'next/navigation';

export default function SubHeader() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/main');
  };
  return (
    <>
      <div className="w-full flex justify-center text-text1">
        <div className="w-full max-w-[1280px] px-4 flex items-center justify-between mt-[16px]">
          <div className="flex gap-[50px] tm3">
            <button type="button" onClick={handleHome}>
              홈
            </button>
            <button type="button">모집</button>
          </div>

          <div className="flex gap-6">
            <button type="button" className="w-8 h-8 rounded-full bg-gray3">
              <Image src={musicBunny} alt="예시 기본 프사" />
            </button>

            <button type="button" className="w-8 h-8 rounded-full bg-gray3">
              <Image src={musicBunny} alt="예시 기본 프사" />
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-[10px] border-main/10" />
    </>
  );
}
