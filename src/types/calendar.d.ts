type StudyScheduleType = {
  teamCalendarId: number;
  studyId: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string | null;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type UserScheduleType = {
  personalCalendarId: number;
  userId: number;
  writerNickname: string;
  writerProfileImageUrl: string | null;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type UnionScheduleType = {
  scheduleId: number;
  studyId?: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string | null;
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
