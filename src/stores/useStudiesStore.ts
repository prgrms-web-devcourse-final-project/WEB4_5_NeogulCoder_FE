import { getStudiesMain } from '@/lib/api/study.api';
import { create } from 'zustand';

type updateStudyType = {
  name: string;
  introduction: string;
  imageUrl: string | null;
  studyType: string;
  category: string;
  capacity: number;
  startDate: string;
};

interface StudyStore {
  studies: StudiesMainType[];
  loading: boolean;
  setStudies: (studies: StudiesMainType[]) => void;
  addStudy: (study: StudiesMainType) => void;
  updateStudy: (studyId: number, newData: updateStudyType) => void;
  deleteStudy: (studyId: number) => void;
  setLoading: (loading: boolean) => void;
  fetchStudies: () => Promise<void>;
}

export const useStudiesStore = create<StudyStore>((set) => ({
  studies: [],
  loading: true,
  setStudies: (studies) => set({ studies }),
  addStudy: (study) => set((state) => ({ studies: [...state.studies, study] })),
  deleteStudy: (studyId) =>
    set((state) => ({
      studies: state.studies.filter((s) => s.studyId !== studyId),
    })),
  updateStudy: (studyId: number, newData: updateStudyType) =>
    set((state) => ({
      studies: state.studies.map((s) =>
        s.studyId === studyId ? { ...s, ...newData } : s
      ),
    })),
  setLoading: (loading) => set({ loading }),
  fetchStudies: async () => {
    set({ loading: true });
    try {
      const { data } = await getStudiesMain();
      console.log('data', data);
      set({ studies: data });
    } catch (err) {
      console.error('스터디 목록을 불러오지 못했습니다.', err);
    } finally {
      set({ loading: false });
    }
  },
}));
