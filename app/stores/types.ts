export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isLeader: boolean;
  isManager: boolean;
  borrowings: Borrowing[];
}
export interface Borrowing {
  id: string;
  borrowId: string;
  borrow: User;
  glId: string;
  gl: GL;
  locationId: string;
  location: Location;
  rentalDate: Date | null;
  expectedReturnDate: Date | null;
  returnDate: Date | null;
  status: BorrowingStatus;
  createdAt: Date;
}
export interface GL {
  id: string;
  gameId: string;
  game: Game;
  locationId: string;
  location: Location;
  status: GameStatus;
  borrowings: Borrowing[];
}
export interface Game {
  id: string;
  name: string;
  category: GameCategory;
  desc: string;
  img: string;
  gls: GL[];
}
export interface Location {
  id: string;
  name: string;
  leaderId: string;
  leader: User;
  managerId: string;
  manager: User;
  gls: GL[];
  borrowings: Borrowing[];
}

export enum GameStatus {
  Available,
  Borrowed,
  Damaged,
}

export enum BorrowingStatus {
  Requested,
  Borrowed,
  Late,
  Returned,
}

export enum GameCategory {
  Singles,
  Marriage,
  General,
}

export interface UserContactInfo {
  name: string; // שם המשתמש
  email: string; // כתובת אימייל
  phone: string; // מספר טלפון
}

// User: מייצג משתמש במערכת
export interface UserFull {
  name: string; // שם המשתמש
  email: string; // כתובת אימייל
  phone: string; // מספר טלפון
  isAdmin: boolean; // האם המשתמש הוא מנהל מערכת
  isLeader: boolean; // האם המשתמש הוא רכז על
  isManager: boolean; // האם המשתמש הוא רכז מוקד
  borrowings: BorrowingForBorrow[]; // רשימת מזהי ההשאלות של המשתמש
}

export interface BorrowingForBorrow {
  gl: GLForBorrow; // פרטי המשחק שהושאל
  rental_date: Date | null; // תאריך ההשאלה
  expected_return_date: Date | null; // תאריך החזרה צפוי
  return_date: Date | null; // תאריך החזרה בפועל
  status: BorrowingStatus; // סטטוס ההשאלה ('התבקש', 'מושאל', 'איחור', 'הוחזר')
}

// GetBorrowingForLocationRes: פרטי השאלה במוקד מסוים
export interface BorrowingForLocation {
  user: UserContactInfo; // פרטי המשתמש שהשאיל
  gl: GLForLocation; // פרטי המשחק במוקד
  rental_date: Date | null; // תאריך ההשאלה
  expected_return_date: Date | null; // תאריך החזרה צפוי
  return_date: Date | null; // תאריך החזרה בפועל
  status: BorrowingStatus; // סטטוס ההשאלה
}

// CreateBorrowingReq: בקשה ליצירת השאלה
export interface CreateBorrowingReq {
  borrow: string; // מזהה המשתמש שמבקש להשאיל
  gl: string; // מזהה המשחק המבוקש
}
// ApproveBorrowRequest: בקשה לאישור השאלה
export interface ApproveBorrowRequest {
  gl: string; // מזהה המשחק
  rental_date: Date; // תאריך ההשאלה
  expected_return_date: Date; // תאריך החזרה צפוי
}

// ReturnBorrowingReq: בקשה להחזרת השאלה
export interface ReturnBorrowingReq {
  return_date: Date; // תאריך החזרה בפועל
}
export interface GameForGL {
  name: string; // שם המשחק
  category: string; // קטגוריית המשחק
  desc: string; // תיאור המשחק
  img: string; // קישור לתמונה של המשחק
}

// GetGLForLocationRes: מידע על משחק בתוך מוקד
export interface GLForLocation {
  game: GameForGL; // פרטי המשחק
  status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
}

// GetGLForBorrowRes: מידע על משחק שהושאל
export interface GLForBorrow {
  game: GameForGL; // פרטי המשחק
  location: LocationForGL; // פרטי המוקד
  status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
}

// GetLocationInfoRes: תגובה לבקשת מידע על מוקד
export interface LocationInfo {
  name: string; // שם המוקד
  manager: UserContactInfo; // פרטי רכז המוקד
  gls: GLForLocation[]; // רשימת המשחקים במוקד
}

// GetLocationForManagerRes: תגובה לבקשת מידע על מוקד למנהל
export interface LocationForManager {
  name: string; // שם המוקד
  leader: UserContactInfo; // פרטי רכז העל של המוקד
  gls: GLForLocation[]; // רשימת המשחקים במוקד
  borrowings: BorrowingForLocation[]; // רשימת ההשאלות שבוצעו במוקד
}

// GetLocationContactInfoRes: מידע על מוקד לצורך יצירת קשר
export interface LocationForGL {
  name: string; // שם המוקד
  manager: UserContactInfo; // פרטי רכז המוקד
}
