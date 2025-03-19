import mongoose, { Schema, Document } from 'mongoose';

// ממשק IGame
export interface IGame extends Document {
  name: string;
  category: string;
  desc: string;
  img: string;
  gls: mongoose.Types.ObjectId[]; // קישור למוקדים (גלים) של המשחק
}

// הגדרת סכמת ה-Game
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

const Game = mongoose.models.Game || mongoose.model<IGame>('Game', gameSchema);

export default Game;


  export interface GameForGL extends Document{
    name: string; // שם המשחק
    category: string; // קטגוריית המשחק
    desc: string; // תיאור המשחק
    img: string; // קישור לתמונה של המשחק
  }