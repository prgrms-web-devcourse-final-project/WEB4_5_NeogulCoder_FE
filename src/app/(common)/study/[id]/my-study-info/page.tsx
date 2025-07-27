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
