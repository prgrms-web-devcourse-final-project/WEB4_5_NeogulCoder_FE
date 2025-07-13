import Pagination from '@/components/common/Pagination';
import ListMenu from '@/components/my/ListMenu';
import RecruitmentCard from '@/components/my/RecruitmentCard';

export default function RecruitmentList() {
  const recruitmentType = {
    title: '알고리즘 스터디 하실 분 구합니다~!',
    content:
      '국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 나나나나나나나나나',
    createdAt: '2025.07.01',
    commentCount: 3,
    category: 'IT',
    studyWay: '온라인',
    status: '모집 중',
    type: 'my',
  };

  return (
    <div className="w-full">
      <div className="tb2">내가 작성한 모집 글</div>
      <div className="mt-6">
        <ListMenu />
      </div>
      <div className="flex flex-col gap-[30px] mt-[30px]">
        {[...Array(10)].map((_, i) => (
          <RecruitmentCard key={i} {...recruitmentType} />
        ))}
      </div>
      <div className="mt-[30px]">
        <Pagination />
      </div>
    </div>
  );
}
