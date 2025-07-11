import Image from 'next/image';
import musicBunny from '@/assets/images/music-bunny.svg';
import { ChevronRight } from 'lucide-react';

export default function SideBar() {
  const userName = '한유빙';
  return (
    <div className="w-full flex justify-center text-text1">
      <div className="w-[1248px] flex flex-col pl-5 pr-[10px]">
        <div className="w-[300px]">
          <div className="w-[300px] h-[100px] bg-gray4 rounded-[10px] flex items-center">
            <div className="flex items-center gap-[28px] pl-8">
              <div className="w-[80px] h-[80px] bg-white rounded-full">
                <Image src={musicBunny} alt="예시 기본 프사" />
              </div>
              <div>
                <p className="text-[20px] font-medium cursor-default">
                  {userName}
                </p>
                <button
                  type="button"
                  className="text-[14px] text-text1/50 font-medium"
                >
                  프로필 수정
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-5 mt-4">
            <button
              type="button"
              className="w-[140px] h-[40px] bg-gray4 rounded-[10px] font-medium"
            >
              개인 일정
            </button>
            <button
              type="button"
              className="w-[140px] h-[40px] bg-gray4 rounded-[10px] font-medium"
            >
              내 정보 관리
            </button>
          </div> */}
          <div className="flex flex-col gap-[30px] font-medium mt-[35px]">
            <div className="flex justify-between items-center">
              <button type="button">캘린더</button>
              <ChevronRight className="w-[22px] h-[22px] opacity-30" />
            </div>
            <div className="flex justify-between items-center">
              <button type="button">전체 스터디</button>
              <ChevronRight className="w-[22px] h-[22px] opacity-30" />
            </div>
            <div className="flex justify-between items-center">
              <button type="button">내가 신청한 스터디</button>
              <ChevronRight className="w-[22px] h-[22px] opacity-30" />
            </div>
            <div className="flex justify-between items-center">
              <button type="button">내가 작성한 모집 글</button>
              <ChevronRight className="w-[22px] h-[22px] opacity-30" />
            </div>
            <div className="flex justify-between items-center">
              <button type="button">스터디원 피어리뷰</button>
              <ChevronRight className="w-[22px] h-[22px] opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
