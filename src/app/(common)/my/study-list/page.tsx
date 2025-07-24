'use client';

import StudyListClient from '@/components/my/StudyListClient';
import { fetchMyStudyList } from '@/lib/api/my';
import { useEffect, useState } from 'react';

// export default async function StudyList() {
export default function StudyList() {
  const query = {
    page: 0,
    pageSize: 12,
    sort: 'DESC',
  };

  // const myStudyListData = await fetchMyStudyList(query);

  const [initialStudyListData, setInitialStudyListData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const data = await fetchMyStudyList(query);
    setInitialStudyListData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const initialStudyListData = myStudyListData;
  console.log('initialStudyListData:', initialStudyListData);

  if (isLoading) {
    return <></>;
  }

  return <StudyListClient initialStudyListData={initialStudyListData!} />;
}
