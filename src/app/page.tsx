import ApplyingStudyCard from '@/components/my/ApplyingStudyCard';
import RecruitmentCard from '@/components/my/RecruitmentCard';
import StudyCard from '@/components/my/StudyCard';

export default function page() {
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
    <>
      <h1>page Component</h1>
      <StudyCard {...studyType} />
      <ApplyingStudyCard {...studyType} isShown={true} status="미완료" />
      <RecruitmentCard {...recruitmentType} />
    </>
  );
}
