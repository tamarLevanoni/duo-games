import mongoose, { Schema, Document } from 'mongoose';
import { UserContactInfo } from './userTypes';
import { GLForLocation } from './glTypes';
import { BorrowingForLocation } from './borrowingTypes';

// ממשק Location
export interface ILocation extends Document {
  name: string; // שם המוקד
  leader: mongoose.Types.ObjectId; // מזהה רכז על המוקד
  manager: mongoose.Types.ObjectId; // מזהה רכז המוקד
  gls: mongoose.Types.ObjectId[]; // רשימת מזהי המשחקים במוקד
  borrowings: mongoose.Types.ObjectId[]; // רשימת מזהי ההשאלות שבוצעו במוקד
}
export enum GameStatus {
  Available = 1, // זמין
  Borrowed, // מושאל
  Damaged, // פגום
}
export enum BorrowingStatus {Requested , Borrowed, Late , Returned};


// סכמת ה-Location
const locationSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, // שם המוקד
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // קישור לרכז על
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // קישור לרכז המוקד
    gls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GL' }], // קישור למשחקים במוקד
    borrowings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrowing' }], // קישור להשאלות שבוצעו במוקד
  },
  {
    timestamps: true,
  }
);
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
const glSchema: Schema = new Schema(
  {
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }, // קישור למשחק
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, // קישור למוקד
    status: { type: Number, enum: Object.values(GameStatus), required: true }, // סטטוס המשחק במוקד
  },
  {
    timestamps: true,
  }
);
const gameSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    gls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GL' }], // קישור למוקדים
  },
  {
    timestamps: true, // הוספת תאריכי יצירה ועדכון
  }
);
const borrowingSchema: Schema = new Schema(
  {
    borrow: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gl: { type: mongoose.Schema.Types.ObjectId, ref: 'GL', required: true },
    rental_date: { type: Date, default: null },
    expected_return_date: { type: Date, default: null },
    return_date: { type: Date, default: null },
    status: { type: Number,  enum: Object.values(BorrowingStatus), required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
const Location = mongoose.models.Location || mongoose.model<ILocation>('Location', locationSchema);

export default Location;


  // GetLocationInfoRes: תגובה לבקשת מידע על מוקד
  export interface LocationInfo extends Document{
    name: string; // שם המוקד
    manager: UserContactInfo; // פרטי רכז המוקד
    gls: GLForLocation[]; // רשימת המשחקים במוקד
  }
  
  // GetLocationForManagerRes: תגובה לבקשת מידע על מוקד למנהל
  export interface LocationForManager extends Document{
    name: string; // שם המוקד
    leader: UserContactInfo; // פרטי רכז העל של המוקד
    gls: GLForLocation[]; // רשימת המשחקים במוקד
    borrowings: BorrowingForLocation[]; // רשימת ההשאלות שבוצעו במוקד
  }

  // GetLocationContactInfoRes: מידע על מוקד לצורך יצירת קשר
export interface LocationForGL extends Document{
    name: string; // שם המוקד
    manager: UserContactInfo; // פרטי רכז המוקד
  }