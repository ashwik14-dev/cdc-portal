import { Router } from "express";
import { verifyStudentQr } from "../controllers/verify.controller.js";

const router = Router();

// Public route - intentionally NOT protected by auth middleware.
// A student QR code can be scanned by anyone (e.g. a phone camera).
router.get("/:qrId", verifyStudentQr);

export default router;
