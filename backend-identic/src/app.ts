import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error-handler";
import * as dotenv from "dotenv";
import swaggerDocs from "./shared/swagger/swagger-options/swagger";
import router from "./routes/ktp-verification.routes";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(helmet());
app.use(express.json({ limit: "5mb" }));

app.use("/api", router);

app.use(errorHandler);
swaggerDocs(app, Number(process.env.PORT));

export default app;
