import express from "express";
const router = express.Router();
import controller from "../controllers/servicesController.js";

router.get("/", controller.getAll);
router.post("/add", controller.add);
router.put("/:id", controller.Update);
router.delete("/:id", controller.Delete);

export default router;
