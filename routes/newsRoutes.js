import express from "express";
import controller from "../controllers/newsController.js";
import { upload } from "../middlewares/mediaUploads.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.get);
router.post("/", upload.single("file"), controller.post);
router.put("/:id", upload.single("file"), controller.put);
router.delete("/:id", controller.Delete);

export default router;
