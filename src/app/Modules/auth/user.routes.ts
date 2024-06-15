import { Router } from "express";
import { UserController } from "./user.controller";
import validationRequest from "../../middelwares/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/signup",
  validationRequest(UserValidation.userValidationSchema),
  UserController.signup
);

router.post("/signin", UserController.logIn);
export const UserRoutes = router;
