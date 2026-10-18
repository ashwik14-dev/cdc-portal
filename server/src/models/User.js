import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 10);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const STUDENT_BRANCHES = [
  "CSE",
  "CSE + AI & ML",
  "CSE + Data Science",
  "IT",
  "ECE",
  "EEE",
  "CIVIL",
  "MECH",
  "AERONAUTICAL",
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please provide a valid email"],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "faculty", "student"],
        message: "Role must be admin, faculty or student",
      },
      required: true,
    },
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
      unique: true,
      sparse: true,
      default: undefined,
    },
    branch: {
      type: String,
      trim: true,
      enum: {
        values: STUDENT_BRANCHES,
        message: "Please select a valid branch",
      },
      default: undefined,
    },
    studentQrId: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined,
    },
    photo: {
      type: String,
      default: undefined,
      validate: {
        validator: (v) =>
          !v || /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v),
        message: "Photo must be a valid image (JPG, PNG or WebP).",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("validate", function (next) {
  if (this.role === "student" && !this.rollNumber) {
    this.invalidate("rollNumber", "Roll number is required for students");
  }
  if (this.role === "student" && !this.branch) {
    this.invalidate("branch", "Branch is required for students");
  }
  if (this.role === "student" && !this.studentQrId) {
    this.studentQrId = nanoid();
  }
  if (this.role !== "student") {
    this.rollNumber = undefined;
    this.branch = undefined;
    this.studentQrId = undefined;
    this.photo = undefined;
  }
  next();
});

userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
