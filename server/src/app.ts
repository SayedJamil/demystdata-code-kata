import express, { Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

// init middlewares
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:5656",
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(cors());
// init routes
app.use(router);

export default app;
