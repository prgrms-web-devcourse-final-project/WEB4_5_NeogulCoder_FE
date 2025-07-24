'use client';

import ApplicationListClient from '@/components/my/ApplicationListClient';
import { fetchMyApplicationList } from '@/lib/api/my';
import { useEffect, useState } from 'react';

// export default async function ApplyStudyList() {
export default function ApplyStudyList() {
  const query = {
    page: 0,
    pageSize: 12,
    sort: 'DESC',
  };

  // const myApplicationListData = await fetchMyApplicationList(query);

  const [initialApplicationListData, setInitialApplicationListData] =
    useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const data = await fetchMyApplicationList(query);
    setInitialApplicationListData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const initialApplicationListData = myApplicationListData;
  console.log('initialApplicationListData:', initialApplicationListData);

  if (isLoading) {
    return <></>;
  }

  return (
    <ApplicationListClient
      initialApplicationListData={initialApplicationListData!}
    />
  );
}
