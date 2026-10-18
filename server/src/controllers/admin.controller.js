import bcrypt from "bcrypt";
import User, { STUDENT_BRANCHES } from "../models/User.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeBranch(branch) {
  const clean = String(branch || "").trim();
  return STUDENT_BRANCHES.find((b) => b.toLowerCase() === clean.toLowerCase()) || null;
}

function validateBaseFields({ name, email, password }, res) {
  if (!name || !String(name).trim()) {
    res.status(400).json({ success: false, message: "Name is required." });
    return false;
  }
  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    res.status(400).json({ success: false, message: "A valid email is required." });
    return false;
  }
  if (!password || String(password).length < 6) {
    res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    return false;
  }
  return true;
}

export async function createFaculty(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!validateBaseFields({ name, email, password }, res)) return;

    const cleanEmail = String(email).toLowerCase().trim();

    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const faculty = await User.create({
      name: String(name).trim(),
      email: cleanEmail,
      passwordHash,
      role: "faculty",
    });

    res.status(201).json({
      success: true,
      message: `Faculty account created for ${faculty.name}.`,
      user: faculty,
    });
  } catch (err) {
    next(err);
  }
}

export async function listFaculty(_req, res, next) {
  try {
    const faculty = await User.find({ role: "faculty" }).sort({ createdAt: -1 });
    res.json({ success: true, count: faculty.length, faculty });
  } catch (err) {
    next(err);
  }
}

export async function createStudent(req, res, next) {
  try {
    const { name, email, password, rollNumber, branch } = req.body;
    if (!validateBaseFields({ name, email, password }, res)) return;

    if (!rollNumber || !String(rollNumber).trim()) {
      return res.status(400).json({ success: false, message: "Roll number is required for students." });
    }

    const cleanBranch = normalizeBranch(branch);
    if (!cleanBranch) {
      return res.status(400).json({ success: false, message: "Please select a valid branch." });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanRoll = String(rollNumber).toUpperCase().trim();

    const exists = await User.findOne({ $or: [{ email: cleanEmail }, { rollNumber: cleanRoll }] });
    if (exists) {
      const which = exists.email === cleanEmail ? "email" : "roll number";
      return res.status(409).json({ success: false, message: `A student with this ${which} already exists.` });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const student = await User.create({
      name: String(name).trim(),
      email: cleanEmail,
      passwordHash,
      role: "student",
      rollNumber: cleanRoll,
      branch: cleanBranch,
    });

    res.status(201).json({
      success: true,
      message: `Student account created for ${student.name}.`,
      user: student,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ success: false, message: "Student account not found." });
    }

    const { name, email, password, rollNumber, branch } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: "Name is required." });
    }
    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ success: false, message: "A valid email is required." });
    }
    if (!rollNumber || !String(rollNumber).trim()) {
      return res.status(400).json({ success: false, message: "Roll number is required for students." });
    }
    const cleanBranch = normalizeBranch(branch);
    if (!cleanBranch) {
      return res.status(400).json({ success: false, message: "Please select a valid branch." });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanRoll = String(rollNumber).toUpperCase().trim();

    const conflict = await User.findOne({
      _id: { $ne: student._id },
      $or: [{ email: cleanEmail }, { rollNumber: cleanRoll }],
    });
    if (conflict) {
      const which = conflict.email === cleanEmail ? "email" : "roll number";
      return res.status(409).json({ success: false, message: `Another student with this ${which} already exists.` });
    }

    student.name = String(name).trim();
    student.email = cleanEmail;
    student.rollNumber = cleanRoll;
    student.branch = cleanBranch;
    if (password && String(password).trim()) {
      if (String(password).length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      }
      student.passwordHash = await bcrypt.hash(String(password), 10);
    }

    await student.save();

    res.json({ success: true, message: `Student account updated for ${student.name}.`, user: student });
  } catch (err) {
    next(err);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ success: false, message: "Student account not found." });
    }
    await student.deleteOne();
    res.json({ success: true, message: `Student account removed for ${student.name}.` });
  } catch (err) {
    next(err);
  }
}

export async function listStudents(_req, res, next) {
  try {
    const students = await User.find({ role: "student" }).sort({ createdAt: -1 });
    res.json({ success: true, count: students.length, students });
  } catch (err) {
    next(err);
  }
}
