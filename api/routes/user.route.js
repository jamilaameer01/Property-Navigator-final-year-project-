import express from "express";
import { test, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/:id", verifyToken, getUser);
export default router;
