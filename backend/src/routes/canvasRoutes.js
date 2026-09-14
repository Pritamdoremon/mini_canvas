import { Router } from "express";
import { createCanvas, deleteCanvas, getCanvas, getCanvases, updateCanvas } from "../controllers/canvasController.js";

const router = Router();

router.route("/").get(getCanvases).post(createCanvas);
router.route("/:id").get(getCanvas).put(updateCanvas).delete(deleteCanvas);

export default router;
