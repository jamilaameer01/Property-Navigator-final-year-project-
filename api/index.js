import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//PORT
const PORT = process.PORT || 3000;

//run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/listing", listingRouter);

//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
