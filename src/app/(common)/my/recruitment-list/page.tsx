'use client';

import RecruitmentListClient from '@/components/my/RecruitmentListClient';
import { fetchMyRecruitmentList } from '@/lib/api/my';
import { useEffect, useState } from 'react';

// export default async function RecruitmentList() {
export default function RecruitmentList() {
  // const query = {
  //   page: 0,
  //   pageSize: 10,
  //   sort: 'DESC',
  // };
  const query = {
    page: 0,
    pageSize: 10,
    sort: 'DESC',
    category: 'IT',
    studyType: 'ONLINE',
    keyword: 'd',
  };

  // const myRecruitmentListData = await fetchMyRecruitmentList(query);

  const [initialMyRecruitmentListData, setInitialMyRecruitmentListData] =
    useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    const data = await fetchMyRecruitmentList(query);
    setInitialMyRecruitmentListData(data);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const initialMyRecruitmentListData = myRecruitmentListData;
  console.log('initialMyRecruitmentListData:', initialMyRecruitmentListData);

  if (isLoading) {
    return <></>;
  }

  return (
    <RecruitmentListClient
      initialMyRecruitmentListData={initialMyRecruitmentListData!}
    />
  );
}
