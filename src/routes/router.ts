import { Router } from "express";
import controller from "../controller/controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/urlShortner", authMiddleware, controller.createShortUrl);
router.get("/name", authMiddleware, controller.fetchName);
router.post("/getUrls", authMiddleware, controller.fetchUrls);
router.get("/getUrl/:shortId", controller.redirectUrl);
export default router;
