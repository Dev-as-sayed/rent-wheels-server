// src/models/booking.ts

import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validates 24-hour format
  },
  endTime: {
    type: String,
    default: null,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validates 24-hour format
  },
  totalCost: {
    type: Number,
    default: 0,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
  },
});

export const BookingModel = mongoose.model<TBooking>("Booking", bookingSchema);
