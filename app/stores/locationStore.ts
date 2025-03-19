import { Location } from '@prisma/client';
import { create } from 'zustand';

export interface LocationStore {
  locations: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (id: string) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addLocation: (location) => set((state) => ({ locations: [...state.locations, location] })),
  removeLocation: (id) => set((state) => ({ locations: state.locations.filter(l => l.id !== id) })),
}));

export default useLocationStore;