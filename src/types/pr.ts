export type UserProfiles = {
  nickname: string;
  profileImgUrl: string;
};

export type UserLocationAndLinks = {
  location: string;
  links: {
    linkName: string;
    link: string;
  }[];
};

export type ReviewTag = {
  reviewType: string;
  reviewCount: number;
};

export type ReviewContents = {
  reviewUserId: number;
  reviewUserNickname: string;
  reviewUserImgUrl: string;
  reviewComment: string;
  reviewDate: string;
};

export type PrData = {
  userProfiles: UserProfiles[];
  userLocationAndLinks: UserLocationAndLinks[];
  buddyEnergy: number;
  reviewTags: ReviewTag[];
  reviewContents: ReviewContents[];
  introduction: string;
};

export type PrStore = {
  pr: PrData | null;
  fetchMyPr: () => Promise<void>;
  clearPr: () => void;
};

export type ReviewContent = {
  nickname: string;
  imageAccessUrl: string;
  createdAt: string;
  content: string;
};

export type ReviewContentResponse = {
  reviewContents: ReviewContent[];
  totalElementCount: number;
  totalPages: number;
  hasNext: boolean;
};

export type ReviewTags = {
  reviewTag: string;
  reviewTagContent: number;
};

export type ReviewTagResponse = {
  GOOD: ReviewTags[];
  BAD: ReviewTags[];
  EXCELLENT: ReviewTags[];
};
