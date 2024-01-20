import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connectDB } from "./src/modules/mongoose.config.js";
import { startServer } from "./src/startServer.js";
import { routes } from "./src/routes/routes.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const baseUrl = "/"; // Adjust the base URL as needed

// Serve static files from the dist folder with the base URL
app.use(baseUrl, express.static(join(__dirname, "dist")));

app.use(routes);

// Handle requests that don't match a static file
app.get(`${baseUrl}/*`, (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

startServer(app);
connectDB();
