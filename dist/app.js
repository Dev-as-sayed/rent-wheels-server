"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/error/notFound"));
const globalErrorHandelar_1 = __importDefault(require("./app/middelwares/globalErrorHandelar"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/* =============== ROUTER CONNACTION =============== */
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("RENT WHEELS server is running");
});
app.use(notFound_1.default);
app.use(globalErrorHandelar_1.default);
exports.default = app;
