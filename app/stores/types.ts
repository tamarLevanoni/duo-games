import { BorrowingStatus, GameCategory, GameStatus } from "@prisma/client";

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
  id: string; // מזהה המוקד
  name: string; // שם המוקד
  manager: UserContactInfo; // פרטי רכז המוקד
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


export interface gamesInfo {
  id: string;
  name: string;
  category: GameCategory;
  desc: string;
  img: string;
  gls: {
    id: string;
    status: GameStatus;
    locationId: string;
    expectedReturnDate?: Date|null;//from borrowing in status 'borrowed'
  }[]
}
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
  gls: GLForBorrow[]; // פרטי המשחק שהושאל
  location: {
    name: string; // שם המוקד
    manager: UserContactInfo; // פרטי רכז המוקד
  }; // פרטי המוקד
  rentalDate: Date | null; // תאריך ההשאלה
  returnDate: Date | null; // תאריך החזרה בפועל
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
  exepectedReturnDate: Date | null; // תאריך החזרה צפוי
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
  gls: GLForLocation[]; // פרטי המשחק במוקד
  rentalDate: Date | null; // תאריך ההשאלה
  returnDate: Date | null; // תאריך החזרה בפועל
  status: BorrowingStatus; // סטטוס ההשאלה
  createdAt: Date; // תאריך יצירת הבקשה
}

// GetGLForLocationRes: מידע על משחק בתוך מוקד
export interface GLForLocation {
  id: string; // מזהה המשחק במוקד 
  game: GameDetails; // פרטי המשחק
  status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
  exepectedReturnDate: Date | null; // תאריך החזרה צפוי
}




// CreateBorrowingReq: בקשה ליצירת השאלה
export interface CreateBorrowingReq {
  borrow: string; // מזהה המשתמש שמבקש להשאיל
  gls: string[]; // מזהה המשחק המבוקש
}
// ApproveBorrowRequest: בקשה לאישור השאלה
export interface ApproveBorrowRequest {
  id: string; // מזהה הבקשה
  gls: GLForLocation[]; // מזהה המשחק
  rentalDate?: Date; // תאריך ההשאלה
  // expected_returnDate?: Date; // תאריך החזרה צפוי
  status: BorrowingStatus; // סטטוס ההשאלה
  returnDate?: Date; // תאריך החזרה בפועל
}

// ReturnBorrowingReq: בקשה להחזרת השאלה
export interface ReturnBorrowingReq {
  returnDate: Date; // תאריך החזרה בפועל
}




