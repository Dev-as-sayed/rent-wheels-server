"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validationRequest_1 = __importDefault(require("../../middelwares/validationRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middelwares/auth"));
const user_constant_1 = require("../auth/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, validationRequest_1.default)(booking_validation_1.BookingValidation.bookinValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingController.bookingACar);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingController.getAllBookings);
router.get("/:myBookings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingController.getMyBookings);
router.put("/return", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingController.carReturn);
exports.BookingRoutes = router;
