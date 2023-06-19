import express from "express";
import controller from "../controllers/contactUsController.js";
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.GetByID);
router.post("/", controller.Add);
router.delete("/:id", controller.Delete);

export default router;
