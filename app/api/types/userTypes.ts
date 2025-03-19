
import { BorrowingForBorrow } from "./borrowingTypes";

// User: מייצג משתמש במערכת
export interface IUser extends Document{
    name: string; // שם המשתמש
    email: string; // כתובת אימייל
    phone: string; // מספר טלפון
    isAdmin: boolean; // האם המשתמש הוא מנהל מערכת
    isLeader: boolean; // האם המשתמש הוא רכז על
    isManager: boolean; // האם המשתמש הוא רכז מוקד
    borrowings: mongoose.Types.ObjectId[]; // רשימת מזהי ההשאלות של המשתמש
  }

  const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    isLeader: { type: Boolean, required: true },
    isManager: { type: Boolean, required: true },
    borrowings: { type: [mongoose.Schema.Types.ObjectId], ref: 'Borrowing' },
  },
  {
    timestamps: true, // להוסיף תאריכים של יצירה ועדכון
  });
  
  const User = models.User || model<IUser>('User', UserSchema);
  
  export default User;


  // GetUserContactInfo: פרטי יצירת קשר עם משתמש
export interface UserContactInfo extends Document{
    name: string; // שם המשתמש
    email: string; // כתובת אימייל
    phone: string; // מספר טלפון
  }

  // User: מייצג משתמש במערכת
export interface UserFull extends Document{
    name: string; // שם המשתמש
    email: string; // כתובת אימייל
    phone: string; // מספר טלפון
    isAdmin: boolean; // האם המשתמש הוא מנהל מערכת
    isLeader: boolean; // האם המשתמש הוא רכז על
    isManager: boolean; // האם המשתמש הוא רכז מוקד
    borrowings: BorrowingForBorrow[]; // רשימת מזהי ההשאלות של המשתמש
  }
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
    export interface GameForGL extends Document{
      name: string; // שם המשחק
      category: string; // קטגוריית המשחק
      desc: string; // תיאור המשחק
      img: string; // קישור לתמונה של המשחק
    }