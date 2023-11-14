import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connectDB } from "./modules/mongoose.config.js";
import { startServer } from "./startServer.js";

import { AppRoutes } from "./routes/appRoutes.js";
import { NotFoundRoute } from "./routes/noFoundRoute.js";

const { urlencoded, json } = bodyParser;

// env config
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(AppRoutes);

// no match route
app.use(NotFoundRoute);

startServer(app);
connectDB();
