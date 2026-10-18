import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";

const EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@cdc.ac.in";
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Admin@123";
const NAME = "CDC Administrator";

async function seed() {
  await connectDB();

  const existing = await User.findOne({ email: EMAIL });
  if (existing) {
    console.log(`Admin already exists: ${EMAIL}`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  await User.create({ name: NAME, email: EMAIL, passwordHash, role: "admin" });

  console.log("-------------------------------");
  console.log(" Admin account seeded");
  console.log(` Email:    ${EMAIL}`);
  console.log(` Password: ${PASSWORD}`);
  console.log("-------------------------------");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
