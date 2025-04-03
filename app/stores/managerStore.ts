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
  updateBorrowing: (data: Partial<BorrowingForLocation>) => Promise<void>;
}

const useManagerStore = create<ManagerStore>((set,get) => ({
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
  updateBorrowing: async (data: Partial<BorrowingForLocation>) => {
    try {
      const response = await fetch(`/api/borrowings/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to update borrowing:", response.statusText);
        throw new Error("Failed to update borrowing");
      }

      const result = await response.json();
      const updatedBorrowing = result.borrowing;
      console.log("Updated borrowing:", updatedBorrowing);

      set((state) => ({
        borrowings: state.borrowings.map((borrowing) =>
          borrowing.id === data.id
            ? { ...borrowing, ...updatedBorrowing }
            : borrowing
        ),
      }));
      console.log("Borrowing updated successfully",get().borrowings);
    } catch (error) {
      console.error("Failed to update borrowing:", error);
    }
  },
}));

export default useManagerStore;
