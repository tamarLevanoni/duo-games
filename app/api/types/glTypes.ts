import { GameForGL } from "./gameTypes";
import { LocationForGL } from "./locationTypes";

import mongoose, { Schema, Document } from 'mongoose';

export enum GameStatus {
  Available = 1, // זמין
  Borrowed, // מושאל
  Damaged, // פגום
}

// ממשק GL
export interface IGL extends Document {
  game: mongoose.Types.ObjectId; // מזהה המשחק
  location: mongoose.Types.ObjectId; // מזהה המוקד
  status: GameStatus; // סטטוס המשחק במוקד
}

// סכמת ה-GL
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

const GL = mongoose.models.GL || mongoose.model<IGL>('GL', glSchema);

export default GL;


  // GetGLForLocationRes: מידע על משחק בתוך מוקד
export interface GLForLocation extends Document {
    game: GameForGL; // פרטי המשחק
    status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
  }
  
  // GetGLForBorrowRes: מידע על משחק שהושאל
  export interface GLForBorrow extends Document {
    game: GameForGL; // פרטי המשחק
    location: LocationForGL; // פרטי המוקד
    status: GameStatus; // סטטוס המשחק במוקד ('זמין', 'מושאל', 'פגום')
  }