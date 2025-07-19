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
  name: string;
  category: string;
  capacity: number;
  studyType: string;
  location: string;
  startDate: string;
  introduction: string;
  imageUrl: string;
};

type StudyMemberType = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
};

type StudyExtendType = {
  studyId: number;
  members: StudyMemberType[];
  extended: boolean;
};
