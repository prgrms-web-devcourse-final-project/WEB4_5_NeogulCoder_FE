// stores/studyStore.ts
import { create } from 'zustand';

interface StudyStore {
  study: StudyInfoType | null;
  isLoading: boolean;
  setStudyInfo: (info: StudyInfoType) => void;
  updateStudyInfo: (info: StudyHeaderType) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  study: null,
  isLoading: true,
  setStudyInfo: (info: StudyInfoType) => set({ study: info }),
  updateStudyInfo: (info: StudyHeaderType) => {
    const current = get().study;
    if (!current) return; // 현재 study가 없으면 무시
    set({ study: { ...current, ...info } });
  },
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
