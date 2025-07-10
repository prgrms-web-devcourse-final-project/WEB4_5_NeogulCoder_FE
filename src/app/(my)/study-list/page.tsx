import StudyCard from '@/components/common/StudyCard';
import SubMenuItem from '@/components/common/SubMenuItem';

export default function StudyList() {
  const studyType = {
    studyName: '알고리즘 알고가자',
    studyLeader: '한유빙',
    currentMemberCount: 5,
    totalMemberCount: 6,
    startDate: '2025.06.24',
    studyIntro: '알고리즘은 알고 가야 하지 않겠니',
    category: 'IT',
    studyWay: '온라인',
  };

  return (
    <div className="w-[910px] px-6 py-15">
      <div className="tb1 ">전체 스터디</div>
      <div className="mt-6">
        <SubMenuItem isActive={true}>진행 중</SubMenuItem>
        <SubMenuItem isActive={false}>종료</SubMenuItem>
      </div>
      {/* flex justify-between */}
      <div className="grid grid-cols-3 gap-[26px] mt-[30px]">
        <StudyCard {...studyType} />
        <StudyCard {...studyType} />
        <StudyCard {...studyType} />
        <StudyCard {...studyType} />
        <StudyCard {...studyType} />
        <StudyCard {...studyType} />
      </div>
    </div>
  );
}
