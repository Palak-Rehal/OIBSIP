import { Request, Response } from "express";
console.log("AUTH CONTROLLER LOADED");
import bcrypt from "bcryptjs";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middleware/auth.middleware";

// ================= REGISTER =================
export const registerUser = async (req: Request, res: Response) => {
  console.log("REGISTER API CALLED");
  console.log("Request Body:", req.body);

  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user,
    });

  } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req: Request, res: Response) => {
  console.log("LOGIN API CALLED");
  console.log("Request Body:", req.body);

  try {
    const { email, password } = req.body;

    console.log("Searching user...");

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Comparing Password...");

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Generating Token...");

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    console.log("Token Generated Successfully");

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ================= GET PROFILE =================
export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};