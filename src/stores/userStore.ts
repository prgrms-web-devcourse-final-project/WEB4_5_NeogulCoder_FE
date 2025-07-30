import { getUser } from '@/lib/api/user';
import { create } from 'zustand';

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  oauth: string;
  role: string;
}

export interface UserStore {
  user: UserInfo | null;
  isLoading: boolean;
  setUser: (user: UserInfo) => void; // 사용자 정보 저장
  clearUser: () => void; // 사용자 상태 초기화
  fetchUser: () => Promise<void>; // 사용자 정보 가져오기
}

export const userAuthStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => {
    // 로그인 하고 나서 저장
    const userData = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
      oauth: user.oauth,
      role: user.role,
    };
    set({ user: userData });
  },

  clearUser: () => {
    // 로그아웃 하고 나서 초기화
    set({ user: null });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    // 페이지 새로고침 후 정보 다시 불러오기
    try {
      const res = await getUser();
      const user = res.data.data;
      // console.log(user);
      set({
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl,
          oauth: user.oauth,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('실패: ', error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
