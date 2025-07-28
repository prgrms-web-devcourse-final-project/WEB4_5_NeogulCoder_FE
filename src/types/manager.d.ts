type AdminPostType = {
  id: number;
  subject: string;
  expiredDate: string;
  activated: boolean;
};

type AdminStudyType = {
  id: number;
  name: string;
  category: string;
  finished: boolean;
  activated: boolean;
};

type AdminUserType = {
  id: number;
  email: string;
  nickname: string;
  activated: null | boolean;
};
