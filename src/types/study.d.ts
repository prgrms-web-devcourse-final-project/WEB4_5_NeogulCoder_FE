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

type HeaderStudiesType = {
  studyId: number;
  imageUrl: string;
  name?: string;
};
