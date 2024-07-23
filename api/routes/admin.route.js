import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  admin,
  deleteUser,
  getListings,
  getUsers,
  updateAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/admin", admin);
router.post("/update/:id", verifyToken, updateAdmin);
router.get("/listings/:id", verifyToken, getListings);
router.get("/getusers", verifyToken, getUsers);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
