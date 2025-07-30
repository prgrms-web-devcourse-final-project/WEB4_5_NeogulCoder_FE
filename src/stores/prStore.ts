import axiosInstance from '@/lib/api/axiosInstance';
import { PrStore } from '@/types/pr';
import { create } from 'zustand';

export const userPrStore = create<PrStore>((set) => ({
  pr: null,

  fetchMyPr: async () => {
    try {
      const res = await axiosInstance.get('/api/template/mine');
      set({ pr: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error('내 PR 정보 가져오기 실패:', error);
    }
  },
  fetchOtherPr: async (userId: number) => {
    try {
      const res = await axiosInstance.get(`/api/template/${userId}`);
      set({ pr: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error('사용자 PR 정보 가져오기 실패:', error);
    }
  },

  clearPr: () => set({ pr: null }),
}));
