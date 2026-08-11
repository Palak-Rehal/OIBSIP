import { Request, Response } from "express";
console.log("AUTH CONTROLLER LOADED");
import bcrypt from "bcryptjs";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middleware/auth.middleware";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendEmail";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= REGISTER =================
export const registerUser = async (req: Request, res: Response) => {
  console.log("REGISTER API CALLED");
  console.log("Request Body:", req.body);

  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    console.log("Searching for:", email);
    console.log("Existing User:", existingUser);


    if (existingUser) {
      if (!existingUser.isVerified) {
        const verificationToken = crypto.randomBytes(32).toString("hex");
        console.log("Generated Token:", verificationToken);

        existingUser.verificationToken = verificationToken;
        await existingUser.save();

        await sendVerificationEmail(
          existingUser.email,
          verificationToken
        );

        return res.status(200).json({
          success: true,
          message: "Verification email sent again. Please check your inbox.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      verificationToken,
      isVerified: false,
    });
    console.log("Saved Token:", user.verificationToken);
    await sendVerificationEmail(
      user.email,
      verificationToken
    );


    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
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
// ================= VERIFY EMAIL =================
export const verifyEmail = async (
  req: Request,
  res: Response
) => {
  try {

    const { token } = req.params;
    console.log("Token from URL:", token);
    const user = await User.findOne({
      verificationToken: token,
    });
    console.log("User Found:", user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });

  } catch (error) {

    console.error("VERIFY EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
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
    if (!user.isVerified) {
      return res.status(401).json({

        success: false,

        message:
          "Please verify your email before login",

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
// ================= FORGOT PASSWORD =================

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    const resetUrl =
      `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>PizzaHub Password Reset</h2>

        <p>Click the link below to reset your password.</p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
      `,
    });

    return res.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= RESET PASSWORD =================

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
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