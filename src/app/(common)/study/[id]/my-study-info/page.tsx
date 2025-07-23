'use client';

import MyStudyInfoClient from '@/components/study/MyStudyInfoClient';
import {
  checkMyRoleInStudy,
  // checkParticipationList,
  checkStudyExtension,
  fetchMyCommunityList,
} from '@/lib/api/community';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// export default async function MyStudyInfo({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function MyStudyInfo() {
  // const { id } = await params;
  const { id } = useParams();

  const query = {
    page: 0,
    pageSize: 5,
    attributeName: 'createDateTime',
    sort: 'DESC',
  };
  // const communityListData = await fetchMyCommunityList(Number(id), query);
  // const extensionData = await checkStudyExtension(Number(id));
  // // const participationListData = await checkParticipationList(Number(id));
  // const myData = await checkMyRoleInStudy(Number(id));

  const [initialMyCommunityData, setInitialMyCommunityData] = useState();
  const [extensionData, setExtensionData] = useState();
  const [myData, setMyData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const data = await fetchMyCommunityList(Number(id), query);
    setInitialMyCommunityData(data);

    const extendData = await checkStudyExtension(Number(id));
    setExtensionData(extendData);

    const roleData = await checkMyRoleInStudy(Number(id));
    setMyData(roleData);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const responseType = {
  //   postInfos: [
  //     {
  //       id: 12,
  //       title: '모든 국민은 직업선택의 자유를 가진다.',
  //       category: 'NOTICE',
  //       content: '국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
  //       createdDate: '2025-07-21T16:20:58.523Z',
  //       commentCount: 3,
  //     },
  //     {
  //       id: 13,
  //       title:
  //         '아라라라ㅏ라 나난ㄴ나나나ㅏㅏ난나ㅏㅏㄴ나 바나나나나나나미니언 미니언미니언',
  //       category: 'FREE',
  //       content:
  //         '국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다. 국회는 의원의 자격을 심사하며, 의원을 징계할 있다.',
  //       createdDate: '2025-07-22T16:20:58.523Z',
  //       commentCount: 0,
  //     },
  //   ],
  //   totalPage: 1,
  //   totalElementCount: 2,
  //   hasNext: false,
  // };

  // const initialMyCommunityData = communityListData || responseType;
  console.log('initialMyCommunityData:', initialMyCommunityData);
  console.log('extensionData:', extensionData);
  console.log('myData:', myData);

  if (isLoading) {
    return <></>;
  }

  return (
    <MyStudyInfoClient
      initialMyCommunityData={initialMyCommunityData!}
      extensionData={extensionData!}
      // isExtended={extensionData!.extended}
      // isLeader={myData!.role === 'LEADER'}
      myData={myData!}
    />
  );
}
