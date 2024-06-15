import express from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/error/notFound";
import globalErrorHandelar from "./app/middelwares/globalErrorHandelar";

const app = express();

app.use(express.json());
app.use(cors());

/* =============== ROUTER CONNACTION =============== */
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("RENT WHEELS server is running");
});

app.use(notFound);
app.use(globalErrorHandelar);

export default app;
