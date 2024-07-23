// Import necessary modules and models
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

// Controller for admin route
export const admin = (req, res) => {
  res.json({
    message: "Admin route is working",
  });
};

// Controller to update admin user
export const updateAdmin = async (req, res, next) => {
  // Check if the user is updating their own account
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    // Hash the password if provided in the request body
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the admin user
    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Omit the password from the response
    const { password, ...rest } = updatedAdmin._doc;

    // Send the updated admin details in the response
    res.status(200).json(rest);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Controller to get listings associated with a user
export const getListings = async (req, res, next) => {
  // Check if the requested user ID matches the authenticated user ID
  if (req.user.id === req.params.id) {
    try {
      // Find listings associated with the user
      const listings = await Listing.find({ userRef: req.params.id });
      // Send the listings in the response
      res.status(200).json(listings);
    } catch (error) {
      // Handle errors
      next(error);
    }
  } else {
    // Unauthorized access if user ID doesn't match
    return next(errorHandler(401, "Listing not found"));
  }
};

//Get Users to admin side
export const getUsers = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

//delete the users from dashboard
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
