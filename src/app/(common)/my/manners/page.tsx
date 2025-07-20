'use client';

import MannersClient from '@/components/my/MannersClient';
import { fetchStudyList, fetchUserListByStudyId } from '@/lib/api/manners';
import { useEffect, useState } from 'react';

// export default async function Manners() {
//   const initialStudyList = (await fetchStudyList()) ?? [];
//   const initialStudyId = initialStudyList[0]?.studyId ?? -1;
//   const initialUserList = initialStudyId
//     ? await fetchUserListByStudyId(initialStudyId)
//     : [];

export default function Manners() {
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

  const [initialStudyList, setInitialStudyList] = useState([]);
  const [initialStudyId, setInitialStudyId] = useState(-1);
  const [initialUserList, setInitialUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const studyList = await fetchStudyList();
    setInitialStudyList(studyList);

    // if (studyList) {
    const firstStudyId = studyList?.[0]?.studyId;
    setInitialStudyId(firstStudyId);
    // setInitialStudyId(1);
    // }

    if (studyList && firstStudyId !== -1) {
      const userList = await fetchUserListByStudyId(firstStudyId);
      setInitialUserList(userList);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <></>;
  }

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
