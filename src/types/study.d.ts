// 스터디공간 사이드 메뉴 스터디 정보
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

type StudyMyDataType = {
  userId: number;
  studyId: number;
  role: string;
  nickname: string;
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
