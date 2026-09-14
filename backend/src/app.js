import cors from "cors";
import express from "express";
import canvasRoutes from "./routes/canvasRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/canvases", canvasRoutes);
app.use(errorHandler);

export default app;
