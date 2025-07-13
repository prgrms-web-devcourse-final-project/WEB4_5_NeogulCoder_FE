'use client';

import Pagination from '@/components/common/Pagination';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import ListMenuStudy from '@/components/study/ListMenuStudy';

export default function MyStudyInfo() {
  const recruitmentType = {
    title: '오늘 스터디 내용 정리본입니당',
    content:
      '국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 나나나나나나나나나',
    createdAt: '2025.07.01',
    commentCount: 3,
    status: '자유',
    type: 'study',
  };

  return (
    <div className="w-full">
      <div className="tb2  text-text1">스터디 My 정보</div>
      <div className="tm2 text-text1 mt-[30px]">내가 작성한 모집 글</div>
      <div className="mt-6">
        <ListMenuStudy />
      </div>
      <div className="flex flex-col gap-[30px] mt-[30px]">
        {[...Array(5)].map((_, i) => (
          <RecruitmentCard key={i} {...recruitmentType} />
        ))}
      </div>
      <div className="mt-[30px]">
        <Pagination />
      </div>
      <div className="mt-13">
        <div className="tm2 text-text1">스터디 연장</div>
        <hr className="mt-4 text-border2" />
        <div className="flex justify-between items-center mt-6 t3">
          <span className="text-red">스터디를 연장하실 수 있습니다.</span>
          <button className="w-[144px] h-[48px] bg-main rounded-[10px] tm3 text-white hover:bg-[#292929]">
            스터디 연장하기
          </button>
        </div>
      </div>
      <div className="mt-13">
        <div className="tm2 text-text1">스터디 탈퇴</div>
        <hr className="mt-4 text-border2" />
        <div className="flex justify-between items-center mt-6 t3">
          <span className="text-red">
            스터디를 탈퇴하면 불이익이 발생합니다.
          </span>
          <button className="w-[144px] h-[48px] bg-main rounded-[10px] tm3 text-white hover:bg-[#292929]">
            스터디 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
