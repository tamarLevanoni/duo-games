import { Location } from '@prisma/client';
import { create } from 'zustand';
import { LocationInfo } from './types';

export interface LocationStore {
  locations: LocationInfo[];
  fetchLocations: () => void;
  // addlocation: (location: location) => void;
  // removelocation: (id: string) => void;
}

const useLocationStore = create<LocationStore>((set,get) => ({
  locations: [],
  fetchLocations:async () => {
    try {
      console.log('fetching locations'+get().locations.length);
      if (get().locations.length) return;
      const response = await fetch('/api/locations');
      if(!response.ok){
        const error = await response.json();
        throw new Error(error.message||'Failed to fetch locations');
      }
      const locations = await response.json();
      console.log(locations);
      set({ locations });
      
    } catch (error) {
      
    }
  },
  // addlocation: (location) =>{

  // },
  // removelocation: (id) => {

  // },
}));

export default useLocationStore;