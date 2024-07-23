import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/signup", signup);

//SIGNIN || METHOD POST
router.post("/signin", signin);

//GOOGLE || METHOD POST
router.post("/google", google);

//SIGNOUT || METHOD GET
router.get("/signout", signOut);

export default router;
