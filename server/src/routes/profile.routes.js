import { Router } from "express";
import {
  getMyProfile,
  updateMyPhoto,
  removeMyPhoto,
} from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.get("/me", protect, getMyProfile);
router.put("/me/photo", protect, requireRole("student"), updateMyPhoto);
router.delete("/me/photo", protect, requireRole("student"), removeMyPhoto);

export default router;
