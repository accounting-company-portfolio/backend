import express from "express";
const router = express.Router();
import controller from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

router.post("/login", controller.login);
router.post("/register", controller.createAdmin);

router.get("/", controller.getAll);
//router.get('/:id', controller.get);
router.post("/add", auth, controller.add);
router.put("/:id", auth, controller.Update);
router.delete("/:id", auth, controller.Delete);

export default router;
