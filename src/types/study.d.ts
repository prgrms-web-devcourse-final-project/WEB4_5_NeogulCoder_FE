// 스터디공간 사이드 메뉴 스터디 정보
type StudyHeaderType = {
  name: string;
  introduction: string;
  imageUrl: string;
  studyType: string;
  location: string | null;
};

type StudyInfoType = {
  imageUrl: string;
  name: string;
  category: string;
  capacity: number;
  studyType: string;
  location: string;
  startDate: string;
  endDate: string;
  introduction: string;
  members: StudyMemberType[];
};

type StudyInfoUpdateType = {
  imageUrl: string;
  name: string;
  category: string;
  capacity: number;
  studyType: string;
  location: string;
  startDate: string;
  introduction: string;
};

type StudyMemberType = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

type StudyInfoUpdateType = {
  name: string;
  category: string;
  capacity: number;
  studyType: string;
  location: string;
  startDate: string;
  introduction: string;
  imageUrl: string;
};

// 서브헤더 스터디 목록
type HeaderStudiesType = {
  studyId: number;
  imageUrl: string;
  name?: string;
};

// 메인 내 스터디 목록 (서브헤더에서도 사용 됨)
type StudiesMainType = {
  studyId: number;
  name: string;
  leaderNickname: string;
  capacity: number;
  currentCount: number;
  startDate: string;
  endDate: string;
  imageUrl: string | null;
  introduction: string;
  category: string;
  studyType: string;
  finished: boolean;
};
