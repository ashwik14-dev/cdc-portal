import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";

const DEMO_ACCOUNTS_ENABLED = String(process.env.SEED_DEMO_ACCOUNTS ?? "true").toLowerCase() !== "false";

const ADMIN = {
  name: "CDC Administrator",
  email: String(process.env.SEED_ADMIN_EMAIL || "admin@cdc.ac.in").toLowerCase(),
  password: process.env.SEED_ADMIN_PASSWORD || "Admin@123",
  role: "admin",
};

const DEMO_ACCOUNTS = [
  { name: "Dr. Priya Sharma", email: "priya@cdc.ac.in", password: "Fac@123", role: "faculty" },
  {
    name: "Rahul Verma",
    email: "rahul@cdc.ac.in",
    password: "Stu@123",
    role: "student",
    rollNumber: "22B91A0501",
    branch: "CSE",
  },
];

async function createIfMissing({ password, ...fields }) {
  const existing = await User.findOne({ email: fields.email });
  if (existing) {
    console.log(`  skipped  ${fields.role.padEnd(7)} ${fields.email}  (already exists)`);
    return { status: "skipped", user: existing };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ ...fields, passwordHash });
  console.log(`  created  ${fields.role.padEnd(7)} ${fields.email}`);
  return { status: "created", user, password };
}

function printRow(label, email, password) {
  console.log(`  ${label.padEnd(8)} ${email.padEnd(20)} ${password}`);
}

async function seed() {
  await connectDB();

  console.log("");
  console.log("Seeding CDC Portal accounts...");
  console.log("");

  const admin = await createIfMissing(ADMIN);

  const demo = [];
  if (DEMO_ACCOUNTS_ENABLED) {
    for (const account of DEMO_ACCOUNTS) {
      demo.push({ account, ...(await createIfMissing(account)) });
    }
  } else {
    console.log("  SEED_DEMO_ACCOUNTS=false - demo faculty/student accounts not seeded");
  }

  console.log("");
  console.log("  ------------------------------------------------------------");
  console.log("  Login credentials (local development only)");
  console.log("  ------------------------------------------------------------");
  console.log("  ROLE     EMAIL                PASSWORD");
  printRow("Admin", ADMIN.email, ADMIN.password);
  for (const { account } of demo) {
    printRow(account.role.charAt(0).toUpperCase() + account.role.slice(1), account.email, account.password);
  }
  console.log("  ------------------------------------------------------------");

  if (admin.status === "skipped" && admin.user) {
    console.log("  Admin already existed - its password was NOT changed.");
    console.log("  Set SEED_ADMIN_PASSWORD and delete the admin to reset it.");
  }
  for (const { account, user } of demo) {
    if (account.role === "student" && user?.studentQrId) {
      console.log(`  Student QR verification path: /verify/${user.studentQrId}`);
    }
  }
  console.log("");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("Seed failed:", err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
