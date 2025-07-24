type StudyHeaderType = {
  name: string;
  introduction: string;
  imageUrl: string | null;
  studyType: string;
  location: string;
  category: string;
  capacity: number;
  startDate?: string;
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
  startDate?: string;
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

type StudyAttendanceType = {
  attendances: StudyAttendanceDaysType[];
  attendanceRate: number;
};
type StudyAttendanceDaysType = {
  studyId: number;
  userId: number;
  attendanceDate: string;
};

type StudyDashboardType = {
  progressDays: number;
  totalDays: number;
  capacity: number;
  currentCount: number;
  totalPostCount: number;
  teamCalendars: {
    teamCalendarId: number;
    studyId: number;
    writerId: number;
    writerNickname: string;
    writerProfileImageUrl: string | null;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }[];
  noticePosts: DashBoardPostType[];
  freePosts: DashBoardPostType[];
};

type DashBoardPostType = {
  postId: number;
  category: string;
  title: string;
  createdAt: string;
};
