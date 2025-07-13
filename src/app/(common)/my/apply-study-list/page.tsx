import Pagination from '@/components/common/Pagination';
import ApplyingStudyCard from '@/components/my/ApplyingStudyCard';
import ListMenu from '@/components/my/ListMenu';

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
    <div className='w-full'>
      <div className='tb3'>내가 신청한 스터디</div>
      <div className='mt-6'>
        <ListMenu />
      </div>
      <div className='grid grid-cols-3 gap-[26px] mt-[30px]'>
        {[...Array(4)].map((_, i) => (
          <ApplyingStudyCard
            key={i}
            {...studyType}
            isShown={false}
            status='미완료'
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <ApplyingStudyCard
            key={i}
            {...studyType}
            isShown={true}
            status='승인'
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <ApplyingStudyCard
            key={i}
            {...studyType}
            isShown={true}
            status='거절'
          />
        ))}
      </div>
      <div className='mt-[30px]'>
        <Pagination />
      </div>
    </div>
  );
}
