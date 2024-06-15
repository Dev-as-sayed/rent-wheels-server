import { Router } from "express";
import { carController } from "./car.controller";
import validationRequest from "../../middelwares/validationRequest";
import { CarValidation } from "./car.validation";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../auth/user.constant";
import { TUserRole } from "../auth/user.ifterface";

const router = Router();

router.post(
  "/",
  validationRequest(CarValidation.createCarValidationSchema),
  auth(USER_ROLE.admin as TUserRole),
  carController.createCar
);
router.get("/get-all-cars", carController.getAllCars);
router.get("/:id", carController.getSingleCarById);
router.delete(
  "/:id",
  auth(USER_ROLE.admin as TUserRole),
  carController.deletCarById
);
router.patch(
  "/:id",
  auth(USER_ROLE.admin as TUserRole),
  carController.updateCar
);

export const CarRoutes = router;
