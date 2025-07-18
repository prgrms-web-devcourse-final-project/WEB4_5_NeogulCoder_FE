export type StudyList = {
  studies: {
    studyId: number;
    name: string;
    leaderNickname: string;
    capacity: number;
    currentCount: number;
    startDate: string;
    imageUrl: string;
    introduction: string;
    category: string;
    studyType: string;
    finished: boolean;
  }[];
  totalPage: number;
  totalElementCount: number;
};
