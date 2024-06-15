import { Router } from "express";
import { BookingController } from "./booking.controller";
import validationRequest from "../../middelwares/validationRequest";
import { BookingValidation } from "./booking.validation";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../auth/user.constant";
import { TUserRole } from "../auth/user.ifterface";

const router = Router();

router.post(
  "/",
  validationRequest(BookingValidation.bookinValidationSchema),
  auth(USER_ROLE.user as TUserRole),
  BookingController.bookingACar
);
router.get(
  "/",
  auth(USER_ROLE.admin as TUserRole),
  BookingController.getAllBookings
);
router.get(
  "/:myBookings",
  auth(USER_ROLE.user as TUserRole),
  BookingController.getMyBookings
);
router.put(
  "/return",
  auth(USER_ROLE.admin as TUserRole),
  BookingController.carReturn
);

export const BookingRoutes = router;
