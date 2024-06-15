import mongoose, { Schema } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  color: {
    type: String,
    required: true,
    maxlength: 25,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  features: {
    type: [String],
    required: true,
    validate: {
      validator: function (err: any) {
        return err.length > 0;
      },
      message: "Every car minimub 1 features required !",
    },
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CarMode = mongoose.model("Car", carSchema);
