import User from "../models/User.js";

// Public endpoint: resolves a student from a scanned QR identifier and returns
// only non-sensitive details. No email, password hash or token is ever exposed.
export async function verifyStudentQr(req, res, next) {
  try {
    const { qrId } = req.params;
    if (!qrId) {
      return res.status(400).json({ success: false, message: "A QR identifier is required." });
    }

    const user = await User.findOne({ studentQrId: qrId, role: "student" })
      .select("name rollNumber branch studentQrId photo");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No student found for this QR code.",
      });
    }

    res.json({
      success: true,
      data: {
        verified: true,
        name: user.name,
        rollNumber: user.rollNumber || null,
        branch: user.branch || null,
        studentQrId: user.studentQrId,
        photo: user.photo || null,
        institute: "Institute of Aeronautical Engineering",
      },
    });
  } catch (err) {
    next(err);
  }
}
