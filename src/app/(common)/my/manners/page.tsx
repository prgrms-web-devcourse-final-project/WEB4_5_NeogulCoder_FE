import MannersClient from '@/components/my/MannersClient';
import { fetchStudyList, fetchUserListByStudyId } from '@/lib/api/manners';

export default async function Manners() {
  const initialStudyList = await fetchStudyList();
  const initialStudyId = initialStudyList[0]?.studyId;
  const initialUserList = initialStudyId
    ? await fetchUserListByStudyId(initialStudyId)
    : [];

  // const responseStudyType = [
  //   {
  //     studyId: 11,
  //     studyName: '자바 스터디',
  //     imageUrl: '',
  //   },
  //   {
  //     studyId: 22,
  //     studyName: '알고리즘 스터디',
  //     imageUrl: '',
  //   },
  //   {
  //     studyId: 33,
  //     studyName: '모각코',
  //     imageUrl: '',
  //   },
  // ];
  // // 파라미터로 studyId 값 입력 시
  // const responseUserType2 = [
  //   {
  //     userId: 2,
  //     nickname: '스영',
  //   },
  //   {
  //     userId: 3,
  //     nickname: '소정',
  //   },
  //   {
  //     userId: 4,
  //     nickname: '강민',
  //   },
  // ];

  return (
    <MannersClient
      initialStudyList={initialStudyList}
      initialUserList={initialUserList}
      initialStudyId={initialStudyId}

      // initialStudyList={responseStudyType}
      // initialUserList={responseUserType2}
      // initialStudyId={responseStudyType[0].studyId}
    />
  );
}
