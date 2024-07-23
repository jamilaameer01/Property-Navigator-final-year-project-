// Import necessary modules and models
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SignUp controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Create a new user with hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Save the new user
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

// SignIn controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    // Validation
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Omit password from the response
    const { password: pass, ...rest } = validUser._doc;
    // Set JWT token as cookie and send user details
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google OAuth controller
export const google = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Omit password from the response
      const { password: pass, ...rest } = user._doc;
      // Set JWT token as cookie and send user details
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // Generate random password for new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // Hash the password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Generate a unique username
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      // Save new user
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // Omit password from the response
      const { password: pass, ...rest } = newUser._doc;
      // Set JWT token as cookie and send user details
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// SignOut controller
export const signOut = async (rq, res, next) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};





