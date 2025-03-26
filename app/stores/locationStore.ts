import { Location } from '@prisma/client';
import { create } from 'zustand';
import { LocationInfo } from './types';

export interface LocationStore {
  locations: LocationInfo[];
  fetchLocations: () => void;
  // addlocation: (location: location) => void;
  // removelocation: (id: string) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  fetchLocations:async () => {
    try {
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