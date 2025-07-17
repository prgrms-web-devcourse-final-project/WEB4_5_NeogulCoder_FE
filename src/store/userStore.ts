import { getUser } from '@/lib/api/axios';
import { create } from 'zustand';

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  role: string;
  profileImgUrl: string | null;
}

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
}

export const userAuthStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => {
    const userData = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
      profileImgUrl: user.profileImgUrl,
    };
    set({ user: userData });
  },
  clearUser: () => {
    set({ user: null });
  },

  fetchUser: async () => {
    try {
      const res = await getUser();
      const user = res.data.data;
      // console.log(user);
      set({
        user: {
          id: user.userId,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          profileImgUrl: user.profileImgUrl,
        },
      });
    } catch (error: any) {
      console.error('실패: ', error);
      set({ user: null });
    }
  },
}));
