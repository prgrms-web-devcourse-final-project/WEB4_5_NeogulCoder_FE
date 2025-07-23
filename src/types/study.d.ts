type StudyHeaderType = {
  name: string;
  introduction: string;
  imageUrl: string;
  studyType: string;
  location: string | null;
};

type StudyInfoType = {
  imageUrl: string | null;
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
  imageUrl?: string | null;
};

type StudyMemberType = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
};

type StudyExtendType = {
  studyId: number;
  members: {
    userId: number;
    nickname: string;
    role: string;
    participated: boolean | null;
  }[];
  extended: boolean;
};
