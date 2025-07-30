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

export type ReviewType = {
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
  reviewTypes: ReviewType[];
  reviewContents: ReviewContents[];
  introduction: string;
};

export type PrStore = {
  pr: PrData | null;
  fetchMyPr: () => Promise<void>;
  fetchOtherPr: (userId: number) => Promise<void>;
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

export type ReviewTag = {
  reviewTag: string;
  reviewTagCount: number;
};

export type ReviewTagResponse = {
  GOOD?: ReviewTag[];
  BAD?: ReviewTag[];
  EXCELLENT?: ReviewTag[];
};
