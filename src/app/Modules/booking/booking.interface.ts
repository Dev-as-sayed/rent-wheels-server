import mongoose from "mongoose";
import { string } from "zod";

export type TBooking = {
  date: Date;
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  isBooked: "unconfirmed" | "confirmed";
};

export type TBookingReturn = {
  bookingId: mongoose.Types.ObjectId;
  endTime: string;
};
