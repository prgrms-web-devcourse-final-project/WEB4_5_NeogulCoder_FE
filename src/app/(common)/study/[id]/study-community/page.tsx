'use client';

import StudyCommunityClient from '@/components/study/StudyCommunityClient';
import { fetchStudyCommunityList } from '@/lib/api/community';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// export default async function StudyCommunity({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function StudyCommunity() {
  // const { id } = await params;
  const { id } = useParams();

  const query = {
    page: 0,
    pageSize: 10,
    attributeName: 'createDateTime',
    sort: 'DESC',
  };
  // const data = await fetchStudyCommunityList(Number(id), query);

  const [initialStudyCommunityData, setInitialStudyCommunityData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const data = await fetchStudyCommunityList(Number(id), query);
    setInitialStudyCommunityData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const initialStudyCommunityData = data || responseType;
  console.log('initialStudyCommunityData:', initialStudyCommunityData);

  if (isLoading) {
    return <></>;
  }

  return (
    <StudyCommunityClient
      initialStudyCommunityData={initialStudyCommunityData!}
    />
  );
}
