export type TimeVoteStatsType = {
  startDate: string;
  endDate: string;
  stats: {
    timeSlot: string;
    voteCount: number;
  }[];
};

export type TimeVoteSubmissionsType = {
  studyMemberId: number;
  nickname: string;
  profileImageUrl: string;
  submitted: boolean;
}[];
