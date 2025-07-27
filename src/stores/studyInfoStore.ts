// stores/studyStore.ts
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { create } from 'zustand';

dayjs.extend(isBetween);

interface StudyStore {
  study: StudyInfoType | null;
  isProgress: boolean;
  isLoading: boolean;
  leader: boolean;
  setStudyInfo: (info: StudyInfoType) => void;
  updateStudyInfo: (info: StudyHeaderType) => void;
  setLoading: (isLoading: boolean) => void;
  setLeader: (leader: boolean) => void;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  study: null,
  isLoading: true,
  isProgress: false,
  leader: false,
  setStudyInfo: (info: StudyInfoType) => {
    const today = dayjs();
    const start = dayjs(info.startDate);
    const end = dayjs(info.endDate);

    set({ study: info, isProgress: today.isBetween(start, end, 'day', '[]') });
  },
  updateStudyInfo: (info: StudyHeaderType) => {
    const study = get().study;
    if (!study) return; // 현재 study가 없으면 무시
    const today = dayjs();
    const start = dayjs(info.startDate);
    const end = dayjs(get().study?.endDate);

    set({
      study: { ...study, ...info },
      isProgress: today.isBetween(start, end, 'day', '[]'),
    });
  },
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setLeader: (leader: boolean) => set({ leader: leader }),
}));
