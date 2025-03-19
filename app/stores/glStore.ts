import { GL } from '@prisma/client';
import { create } from 'zustand';

export interface GLStore {
  gls: GL[];
  addGL: (gl: GL) => void;
  removeGL: (id: string) => void;
}

const useGLStore = create<GLStore>((set) => ({
  gls: [],
  addGL: (gl) => set((state) => ({ gls: [...state.gls, gl] })),
  removeGL: (id) => set((state) => ({ gls: state.gls.filter(g => g.id !== id) })),
}));

export default useGLStore;