import ListMenu from '@/components/my/ListMenu';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import NoticeItem from '@/components/study/NoticeItem';

export default function StudyCommunity() {
  const noticeType = {
    title: '다음 주 일정 안내',
    createdAt: '2025.07.01',
  };

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
    // py-15
    <div className="w-full px-6">
      <div className="tb1 text-[20px] text-text1">커뮤니티</div>
      <div className="mt-6">
        <ListMenu />
      </div>
      <div className="flex flex-col gap-4 p-6 bg-[#fafafa] rounded-[8px] mt-[30px]">
        <NoticeItem {...noticeType} />
        <NoticeItem {...noticeType} />
      </div>
      {/* flex justify-between */}
      <div className="flex flex-col gap-[30px] mt-[30px]">
        <RecruitmentCard {...recruitmentType} />
        <RecruitmentCard {...recruitmentType} />
        <RecruitmentCard {...recruitmentType} />
        <RecruitmentCard {...recruitmentType} />
        <RecruitmentCard {...recruitmentType} />
      </div>
    </div>
  );
}
