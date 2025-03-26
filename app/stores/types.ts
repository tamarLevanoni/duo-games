import { BorrowingStatus, GameStatus } from "@prisma/client";

// הקובץ מכיל את כל הטיפוסים הנדרשים לאפליקציה  
export interface UserContactInfo {
  name: string; // שם המשתמש
  email: string; // כתובת אימייל
  phone: string; // מספר טלפון
}

export const USER_CONTACT_FIELDS = {
  select: {
    name: true,
    email: true,
    phone: true,
  },
};

// GetLocationInfoRes: תגובה לבקשת מידע על מוקד
export interface LocationInfo {
  name: string; // שם המוקד
  manager: UserContactInfo; // פרטי רכז המוקד
  gls: GLForLocation[]; // רשימת המשחקים במוקד
}

export interface GameDetails {
  name: string; // שם המשחק
  category: string; // קטגוריית המשחק
  desc: string; // תיאור המשחק
  img: string; // קישור לתמונה של המשחק
}
// export const GAME_DETAILS = { include: { gls: false } };
export const GL_DETAILS = {
  include: {
    game: { include: { gls: false } },
  },
};



// User: מייצג משתמש במערכת
export interface UserFull {
  id: string; // מזהה המשתמש
  name: string; // שם המשתמש
  email: string; // כתובת אימייל
  phone: string; // מספר טלפון
  isAdmin: boolean; // האם המשתמש הוא מנהל מערכת
  isLeader: boolean; // האם המשתמש הוא רכז על
  isManager: boolean; // האם המשתמש הוא רכז מוקד
  borrowings: BorrowingForBorrow[]; // רשימת מזהי ההשאלות של המשתמש
}

export interface BorrowingForBorrow {
  id: string; // מזהה ההשאלה
  gl: GLForBorrow[]; // פרטי המשחק שהושאל
  location: {
    name: string; // שם המוקד
    manager: UserContactInfo; // פרטי רכז המוקד
  }; // פרטי המוקד
  rental_date: Date | null; // תאריך ההשאלה
  expected_return_date: Date | null; // תאריך החזרה צפוי
  return_date: Date | null; // תאריך החזרה בפועל
  status: BorrowingStatus; // סטטוס ההשאלה ('התבקש', 'מושאל', 'איחור', 'הוחזר')
}

// GetGLForBorrowRes: מידע על משחק שהושאל
export interface GLForBorrow {
  id: string; // מזהה המשחק במוקד
  game: GameDetails; // פרטי המשחק
  // location: {
  //   name: string; // שם המוקד
  //   manager: UserContactInfo; // פרטי רכז המוקד
  // }; // פרטי המוקד
  // location:LocationForGL
  status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
}





// // GetLocationContactInfoRes: מידע על מוקד לצורך יצירת קשר
// export interface LocationForGL {
//   name: string; // שם המוקד
//   manager: UserContactInfo; // פרטי רכז המוקד
// }

// GetLocationForManagerRes: תגובה לבקשת מידע על מוקד למנהל
export interface LocationForManager {
  id: string; // מזהה המוקד 
  name: string; // שם המוקד
  leader: UserContactInfo; // פרטי רכז העל של המוקד
  gls: GLForLocation[]; // רשימת המשחקים במוקד
  borrowings: BorrowingForLocation[]; // רשימת ההשאלות שבוצעו במוקד
}

// GetBorrowingForLocationRes: פרטי השאלה במוקד מסוים
export interface BorrowingForLocation {
  id: string; // מזהה ההשאלה 
  borrow: UserContactInfo; // פרטי המשתמש שהשאיל
  gl: GLForLocation[]; // פרטי המשחק במוקד
  rental_date: Date | null; // תאריך ההשאלה
  expected_return_date: Date | null; // תאריך החזרה צפוי
  return_date: Date | null; // תאריך החזרה בפועל
  status: BorrowingStatus; // סטטוס ההשאלה
}

// GetGLForLocationRes: מידע על משחק בתוך מוקד
export interface GLForLocation {
  id: string; // מזהה המשחק במוקד 
  game: GameDetails; // פרטי המשחק
  status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
}




// CreateBorrowingReq: בקשה ליצירת השאלה
export interface CreateBorrowingReq {
  borrow: string; // מזהה המשתמש שמבקש להשאיל
  gl: string; // מזהה המשחק המבוקש
}
// ApproveBorrowRequest: בקשה לאישור השאלה
export interface ApproveBorrowRequest {
  id: string; // מזהה הבקשה
  gl: string[]; // מזהה המשחק
  rental_date: Date; // תאריך ההשאלה
  expected_return_date: Date; // תאריך החזרה צפוי
}

// ReturnBorrowingReq: בקשה להחזרת השאלה
export interface ReturnBorrowingReq {
  return_date: Date; // תאריך החזרה בפועל
}




