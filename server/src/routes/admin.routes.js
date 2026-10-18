import { Router } from "express";
import {
  createFaculty,
  listFaculty,
  createStudent,
  listStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.use(protect, requireRole("admin"));

router.post("/faculty", createFaculty);
router.get("/faculty", listFaculty);
router.post("/students", createStudent);
router.get("/students", listStudents);
router.patch("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

export default router;
