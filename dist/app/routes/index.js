"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_routes_1 = require("../Modules/car/car.routes");
const booking_routes_1 = require("../Modules/booking/booking.routes");
const user_routes_1 = require("../Modules/auth/user.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/car",
        route: car_routes_1.CarRoutes,
    },
    {
        path: "/booking",
        route: booking_routes_1.BookingRoutes,
    },
];
moduleRoutes.forEach((el) => router.use(el.path, el.route));
exports.default = router;
