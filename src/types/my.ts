export type MyRecruitmentQueryType = {
  page: number;
  pageSize: number;
  category?: string;
  studyType?: string;
  keyword?: string;
  sort: string;
};

export type MyRecruitmentListType = {
  postInfos: {
    recruitmentPostId: number;
    subject: string;
    content: string;
    category: string;
    studyType: string;
    status: string;
    commentCount: number;
    createAt: string;
  }[];
  totalPage: number;
  totalElementCount: number;
  hasNext: boolean;
};

export type MyStudyQueryType = {
  page: number;
  pageSize: number;
  finished?: string;
  sort: string;
};

export type MyStudyListType = {
  studies: {
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
  }[];
  totalPage: number;
  totalElementCount: number;
  hasNext: boolean;
};

export type MyApplicationQueryType = {
  page: number;
  pageSize: number;
  status?: string;
  sort: string;
};

export type MyApplicationListType = {
  applications: {
    applicationId: number;
    name: string;
    leaderNickname: string;
    capacity: number;
    currentCount: number;
    startDate: string;
    imageUrl: string;
    introduction: string;
    category: string;
    studyType: string;
    read: boolean;
    status: string;
  }[];
  totalPage: number;
  totalElementCount: number;
  hasNext: boolean;
};
