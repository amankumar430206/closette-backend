import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connectDB } from "./modules/mongoose.config.js";
import { startServer } from "./startServer.js";
import { routes } from "./routes/routes.js";

const { urlencoded, json } = bodyParser;

// env config
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files in the 'uploads' folder
app.use("/uploads", express.static("uploads"));

app.use(routes);

startServer(app);
connectDB();
