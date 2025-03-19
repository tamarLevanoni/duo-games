import mongoose, { Schema, Document } from 'mongoose';

// הגדרת המודלים
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  isLeader: { type: Boolean, required: true },
  isManager: { type: Boolean, required: true },
  borrowings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrowing' }],
}, { timestamps: true });

const LocationSchema = new Schema({
  name: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GL' }],
  borrowings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrowing' }],
}, { timestamps: true });

const GLSchema = new Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  status: { type: Number, required: true },
}, { timestamps: true });

const GameSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  gls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GL' }],
}, { timestamps: true });

const BorrowingSchema = new Schema({
  borrow: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gl: { type: mongoose.Schema.Types.ObjectId, ref: 'GL', required: true },
  rental_date: { type: Date, default: null },
  expected_return_date: { type: Date, default: null },
  return_date: { type: Date, default: null },
  status: { type: String, enum: ['Requested', 'Borrowed', 'Late', 'Returned'], required: true },
  created_at: { type: Date, default: Date.now },
}, { timestamps: true });

// יצירת המודלים
const User = mongoose.model('User', UserSchema);
const Location = mongoose.model('Location', LocationSchema);
const GL = mongoose.model('GL', GLSchema);
const Game = mongoose.model('Game', GameSchema);
const Borrowing = mongoose.model('Borrowing', BorrowingSchema);

