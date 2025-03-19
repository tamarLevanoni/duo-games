import mongoose, { Schema, Document } from 'mongoose';

export type BorrowingStatus = 'Requested' | 'Borrowed' | 'Late' | 'Returned';

export interface IBorrowing extends Document {
  id: mongoose.Types.ObjectId;
  borrow: mongoose.Types.ObjectId; // מזהה המשתמש שהשאיל
  gl: mongoose.Types.ObjectId; // מזהה המשחק שהושאל
  rental_date: Date | null;
  expected_return_date: Date | null;
  return_date: Date | null;
  status: BorrowingStatus;
  created_at: Date;
}

const borrowingSchema: Schema = new Schema(
  {
    borrow: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gl: { type: mongoose.Schema.Types.ObjectId, ref: 'GL', required: true },
    rental_date: { type: Date, default: null },
    expected_return_date: { type: Date, default: null },
    return_date: { type: Date, default: null },
    status: { type: String, enum: ['Requested', 'Borrowed', 'Late', 'Returned'], required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Borrowing = mongoose.models.Borrowing || mongoose.model<IBorrowing>('Borrowing', borrowingSchema);

export default Borrowing;


import { GLForBorrow, GLForLocation } from "./glTypes";
import { UserContactInfo } from "./userTypes";


  // GetBorrowingForBorrowRes: פרטי השאלה עבור משתמש
export interface BorrowingForBorrow extends Document{
    gl: GLForBorrow; // פרטי המשחק שהושאל
    rental_date: Date | null; // תאריך ההשאלה
    expected_return_date: Date | null; // תאריך החזרה צפוי
    return_date: Date | null; // תאריך החזרה בפועל
    status: BorrowingStatus; // סטטוס ההשאלה ('התבקש', 'מושאל', 'איחור', 'הוחזר')
  }
  
  // GetBorrowingForLocationRes: פרטי השאלה במוקד מסוים
  export interface BorrowingForLocation extends Document{
    user: UserContactInfo; // פרטי המשתמש שהשאיל
    gl: GLForLocation; // פרטי המשחק במוקד
    rental_date: Date | null; // תאריך ההשאלה
    expected_return_date: Date | null; // תאריך החזרה צפוי
    return_date: Date | null; // תאריך החזרה בפועל
    status: BorrowingStatus; // סטטוס ההשאלה
  }

  // CreateBorrowingReq: בקשה ליצירת השאלה
export interface CreateBorrowingReq extends Document{
    borrow: mongoose.Types.ObjectId; // מזהה המשתמש שמבקש להשאיל
    gl: mongoose.Types.ObjectId; // מזהה המשחק המבוקש
  }
  // ApproveBorrowRequest: בקשה לאישור השאלה
  export interface ApproveBorrowRequest extends Document{
    gl: mongoose.Types.ObjectId; // מזהה המשחק
    rental_date: Date; // תאריך ההשאלה
    expected_return_date: Date; // תאריך החזרה צפוי
  }
  
  
  // ReturnBorrowingReq: בקשה להחזרת השאלה
  export interface ReturnBorrowingReq extends Document{
    return_date: Date; // תאריך החזרה בפועל
  }