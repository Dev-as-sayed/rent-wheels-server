import { Router } from "express";
import { CarRoutes } from "../Modules/car/car.routes";
import { BookingRoutes } from "../Modules/booking/booking.routes";
import { UserRoutes } from "../Modules/auth/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/car",
    route: CarRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((el) => router.use(el.path, el.route));

export default router;
