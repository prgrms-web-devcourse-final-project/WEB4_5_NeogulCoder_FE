import { create } from 'zustand';

interface StudyStore {
  studies: StudiesListType[];
  setStudies: (studies: StudiesListType[]) => void;
  addStudy: (study: StudiesListType) => void;
  removeStudy: (studyId: number) => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
  studies: [],
  setStudies: (studies) => set({ studies }),
  addStudy: (study) => set((state) => ({ studies: [...state.studies, study] })),
  removeStudy: (studyId) =>
    set((state) => ({
      studies: state.studies.filter((s) => s.studyId !== studyId),
    })),
}));
