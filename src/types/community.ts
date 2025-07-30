export type StudyListType = {
  noticePostInfos: {
    postId: number;
    category: string;
    title: string;
    createdAt: string;
  }[];
  postInfos: {
    id: number;
    title: string;
    category: string;
    content: string;
    createdDate: string;
    commentCount: number;
  }[];
  totalPage: number;
  totalElementCount: number;
  hasNext: boolean;
};

export type StudyListQueryType = {
  page: number;
  size: number;
  category?: string;
  keyword?: string;
  // attributeName?: string;
  sort: string;
};

export type MyListType = {
  postInfos: {
    id: number;
    title: string;
    category: string;
    content: string;
    createdDate: string;
    commentCount: number;
  }[];
  totalPage: number;
  totalElementCount: number;
  hasNext: boolean;
};

export type MyListQueryType = {
  page: number;
  size: number;
  category?: string;
  keyword?: string;
  // attributeName?: string;
  sort: string;
};

export type ExtensionType = {
  studyId: number;
  extended: boolean;
  members: {
    userId: number;
    nickname: string;
    role: string;
    participated: boolean;
  }[];
};

export type MyInfoInStudyType = {
  userId: number;
  studyId: number;
  role: string;
  nickname: string;
};
