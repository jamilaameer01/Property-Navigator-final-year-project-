// Import necessary modules
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.access_token;
  console.log(token);

  // If token is not present, return Unauthorized error
  if (!token) return next(errorHandler(401, "Unauthorized"));

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If token verification fails, return Forbidden error
    if (err) return next(errorHandler(403, "Forbidden"));

    // If token is valid, set the user object in the request and proceed to the next middleware
    req.user = user;
    next();
  });
};
