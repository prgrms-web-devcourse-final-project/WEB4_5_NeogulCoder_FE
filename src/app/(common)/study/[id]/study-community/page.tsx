import StudyCommunityClient from '@/components/study/StudyCommunityClient';

// export default async function StudyCommunity({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
export default function StudyCommunity() {
  // const { id } = await params;

  // const query = {
  //   page: 0,
  //   pageSize: 10,
  //   attributeName: 'createDateTime',
  //   sort: 'DESC',
  // };
  // const data = await fetchStudyCommunityList(Number(id), query);

  return <StudyCommunityClient />;
}
