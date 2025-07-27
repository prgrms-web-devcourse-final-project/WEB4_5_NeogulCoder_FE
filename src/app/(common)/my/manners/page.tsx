import MannersClient from '@/components/my/MannersClient';

// export default async function Manners() {
//   const initialStudyList = (await fetchStudyList()) ?? [];
//   const initialStudyId = initialStudyList[0]?.studyId ?? -1;
//   const initialUserList = initialStudyId
//     ? await fetchUserListByStudyId(initialStudyId)
//     : [];

export default function Manners() {
  return <MannersClient />;
}
