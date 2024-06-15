"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validationRequest_1 = __importDefault(require("../../middelwares/validationRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validationRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.UserController.signup);
router.post("/signin", user_controller_1.UserController.logIn);
exports.UserRoutes = router;
