"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = require("express");
const car_controller_1 = require("./car.controller");
const validationRequest_1 = __importDefault(require("../../middelwares/validationRequest"));
const car_validation_1 = require("./car.validation");
const auth_1 = __importDefault(require("../../middelwares/auth"));
const user_constant_1 = require("../auth/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, validationRequest_1.default)(car_validation_1.CarValidation.createCarValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.carController.createCar);
router.get("/get-all-cars", car_controller_1.carController.getAllCars);
router.get("/:id", car_controller_1.carController.getSingleCarById);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.carController.deletCarById);
router.patch("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), car_controller_1.carController.updateCar);
exports.CarRoutes = router;
