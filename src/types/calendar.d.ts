type StudyScheduleType = {
  calendarId: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string;
  teamId?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type UserScheduleType = {
  calendarId: number;
  userId: number;
  writerNickname: string;
  writerProfileImageUrl: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type ScheduleInputType = {
  teamId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};
type UserScheduleInputType = {
  userId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type StudiesType = {
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
};
