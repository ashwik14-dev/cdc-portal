import User from "../models/User.js";

const PHOTO_DATA_URL = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_PHOTO_CHARS = 2_800_000;

export async function getMyProfile(req, res, next) {
  try {
    // Always resolve the profile from the verified token identity (req.user.id).
    // Never accept a user id from query, params or body.
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    const profile = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    if (user.role === "student") {
      profile.rollNumber = user.rollNumber || null;
      profile.branch = user.branch || null;
      profile.studentQrId = user.studentQrId || null;
      profile.photo = user.photo || null;
    }

    res.json({ success: true, profile });
  } catch (err) {
    next(err);
  }
}

export async function updateMyPhoto(req, res, next) {
  try {
    const { photo } = req.body || {};

    if (typeof photo !== "string" || !PHOTO_DATA_URL.test(photo)) {
      return res.status(400).json({
        success: false,
        message: "Please upload a valid image (JPG, PNG or WebP).",
      });
    }

    if (photo.length > MAX_PHOTO_CHARS) {
      return res.status(413).json({
        success: false,
        message: "Image is too large. Please choose a smaller photo.",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    user.photo = photo;
    await user.save();

    res.json({ success: true, message: "Profile photo updated.", photo });
  } catch (err) {
    next(err);
  }
}

export async function removeMyPhoto(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    user.photo = undefined;
    await user.save();

    res.json({ success: true, message: "Profile photo removed.", photo: null });
  } catch (err) {
    next(err);
  }
}
