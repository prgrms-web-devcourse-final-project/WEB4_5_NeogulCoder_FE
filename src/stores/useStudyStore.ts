import { getStudiesInfo } from '@/lib/api/study.api';
import { create } from 'zustand';

interface StudyStore {
  studies: StudiesListType[];
  loading: boolean;
  setStudies: (studies: StudiesListType[]) => void;
  addStudy: (study: StudiesListType) => void;
  updateStudy: (study: StudiesListType) => void;
  removeStudy: (studyId: number) => void;
  setLoading: (loading: boolean) => void;
  fetchStudies: () => Promise<void>;
}

export const useStudyStore = create<StudyStore>((set) => ({
  studies: [],
  loading: true,
  setStudies: (studies) => set({ studies }),
  addStudy: (study) => set((state) => ({ studies: [...state.studies, study] })),
  removeStudy: (studyId) =>
    set((state) => ({
      studies: state.studies.filter((s) => s.studyId !== studyId),
    })),
  updateStudy: (updatedStudy: StudiesListType) =>
    set((state) => ({
      studies: state.studies.map((s) =>
        s.studyId === updatedStudy.studyId ? updatedStudy : s
      ),
    })),
  setLoading: (loading) => set({ loading }),
  fetchStudies: async () => {
    set({ loading: true });
    try {
      const { data } = await getStudiesInfo();
      console.log('data', data.studies);
      set({ studies: data.studies });
    } catch (err) {
      console.error('스터디 목록을 불러오지 못했습니다.', err);
    } finally {
      set({ loading: false });
    }
  },
}));
