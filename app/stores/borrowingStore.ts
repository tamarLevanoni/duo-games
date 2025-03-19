import { Borrowing } from '@prisma/client';
import { create } from 'zustand';

export interface BorrowingStore {
  borrowings: Borrowing[];
  addBorrowing: (borrowing: Borrowing) => void;
  removeBorrowing: (id: string) => void;
}

const useBorrowingStore = create<BorrowingStore>((set) => ({
  borrowings: [],
  addBorrowing: (borrowing) => set((state) => ({ borrowings: [...state.borrowings, borrowing] })),
  removeBorrowing: (id) => set((state) => ({ borrowings: state.borrowings.filter(b => b.id !== id) })),
}));

export default useBorrowingStore;