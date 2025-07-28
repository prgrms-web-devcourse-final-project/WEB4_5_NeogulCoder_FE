import MyStudyInfoClient from '@/components/study/MyStudyInfoClient';

// export default async function MyStudyInfo({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function MyStudyInfo() {
  // const { id } = await params;

  // const query = {
  //   page: 0,
  //   pageSize: 5,
  //   attributeName: 'createDateTime',
  //   sort: 'DESC',
  // };

  // const communityListData = await fetchMyCommunityList(Number(id), query);
  // const extensionData = await checkStudyExtension(Number(id));
  // // const participationListData = await checkParticipationList(Number(id));
  // const myData = await checkMyRoleInStudy(Number(id));

  return <MyStudyInfoClient />;
}
