type StudiesType = {
  studyId: number;
  name: string;
  leaderNickname: string;
  capacity: number;
  currentCount: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  introduction: string;
  category: string;
  studyType: string;
  finished: boolean;
};

// api에사 오는 값의 Type
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
// api에 넘길 값의 Type
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

// 프론트에서 같은 값으로 처리하기 위한 통합 Type
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
