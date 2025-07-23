export type StudyCommunityData = {
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

export type RequestBodyType = {
  page: number;
  pageSize: number;
  category: string;
  content: string;
  attributeName: string;
  sort: string;
};
