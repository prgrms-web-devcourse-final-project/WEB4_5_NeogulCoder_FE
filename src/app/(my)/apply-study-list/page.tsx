import ApplyingStudyCard from '@/components/common/ApplyingStudyCard';
import ListMenu from '@/components/common/ListMenu';
// import SubMenuItem from '@/components/common/SubMenuItem';

export default function ApplyStudyList() {
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
      <div className="tb1 ">내가 신청한 스터디</div>
      <div className="mt-6">
        {/* <SubMenuItem isActive={true}>진행 중</SubMenuItem>
        <SubMenuItem isActive={false}>종료</SubMenuItem> */}
        <ListMenu />
      </div>
      {/* flex justify-between */}
      <div className="grid grid-cols-3 gap-[26px] mt-[30px]">
        <ApplyingStudyCard {...studyType} isShown={false} status="미완료" />
        <ApplyingStudyCard {...studyType} isShown={true} status="미완료" />
        <ApplyingStudyCard {...studyType} isShown={true} status="승인" />
        <ApplyingStudyCard {...studyType} isShown={true} status="승인" />
        <ApplyingStudyCard {...studyType} isShown={true} status="거절" />
        <ApplyingStudyCard {...studyType} isShown={true} status="거절" />
      </div>
    </div>
  );
}
