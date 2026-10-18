import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

function sendTokenResponse(res, user, statusCode, message) {
  const token = signToken(user);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber || null,
        branch: user.branch || null,
        studentQrId: user.studentQrId || null,
        photo: user.photo || null,
      },
    });
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select("+passwordHash");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    sendTokenResponse(res, user, 200, `Welcome back, ${user.name}!`);
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  res
    .clearCookie("token", { httpOnly: true, secure: process.env.COOKIE_SECURE === "true", sameSite: "lax" })
    .json({ success: true, message: "Logged out successfully." });
}

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Account no longer exists." });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber || null,
        branch: user.branch || null,
        studentQrId: user.studentQrId || null,
        photo: user.photo || null,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}
