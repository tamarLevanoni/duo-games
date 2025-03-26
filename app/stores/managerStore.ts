import { Borrowing, GL, User } from "@prisma/client";
import { create } from "zustand";
import { BorrowingForLocation, GLForLocation, UserContactInfo } from "./types";

export interface ManagerStore {
  locationName: string;
  locationId: string;
  gls: GLForLocation[];
  borrowings: BorrowingForLocation[];
  leader: UserContactInfo | null;
  fetchManagerData: () => Promise<void>;
}

const useManagerStore = create<ManagerStore>((set) => ({
  locationId: "",
  locationName: "",
  gls: [],
  borrowings: [],
  leader: null,
  fetchManagerData: async () => {
    try {
      const response = await fetch(`/api/manager`);
      const data = await response.json();

      set({
        locationName: data.name,
        gls: data.gls,
        borrowings: data.borrowings,
        leader: data.leader,
      });
    } catch (error) {
      console.error("Failed to fetch manager data:", error);
    }
  },
}));

export default useManagerStore;
