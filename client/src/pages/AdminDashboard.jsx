import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  BookUser,
  Loader2,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Mail,
  Lock,
  IdCard,
  User,
  ChevronDown,
  Pencil,
  Trash2,
  Check,
  X,
  Building2,
  RotateCw,
  BarChart3,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import { adminApi } from "../api/admin.api";
import { useAuth } from "../context/AuthContext";

function Alert({ type, message, onClose }) {
  if (!message) return null;
  const ok = type === "success";
  return (
    <div
      className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-xs font-semibold border-2 animate-fade-in-up ${
        ok
          ? "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400"
          : "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400"
      }`}
    >
      {ok ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-px" />}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 cursor-pointer shrink-0">✕</button>
    </div>
  );
}

function GlassCard({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white/10 flex items-center justify-center">
          <Icon className="w-[18px] h-[18px] text-white dark:text-slate-200" />
        </div>
        <div>
          <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 dark:text-blue-200/40 text-[11px] font-medium">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">{value}</div>
        <div className="text-slate-500 dark:text-blue-200/40 text-[10px] font-bold uppercase tracking-widest mt-1">{label}</div>
      </div>
    </div>
  );
}

const emptyFaculty = { name: "", email: "", password: "" };
const emptyStudent = { name: "", email: "", branch: "", rollNumber: "", password: "" };

const BRANCHES = [
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

const SECTIONS = [
  { id: "add", label: "Add Account", icon: UserPlus },
  { id: "data", label: "Overall Data", icon: BarChart3 },
];

const ROLE_TABS = [
  { id: "faculty", label: "Faculty", icon: BookUser, activeCls: "bg-indigo-950 text-white dark:bg-indigo-900" },
  { id: "student", label: "Student", icon: GraduationCap, activeCls: "bg-blue-950 text-white dark:bg-blue-900" },
];

const editInputCls =
  "w-full bg-slate-50 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none focus:border-blue-600 transition";

function FormSelect({ label, icon: Icon, children, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-bold text-slate-500 dark:text-blue-200/60 ml-3 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-blue-200/45 group-focus-within:text-blue-600 transition-colors pointer-events-none"
            aria-hidden="true"
          />
        )}
        <select
          className={`w-full appearance-none bg-white dark:bg-white/[0.06] border-2 border-slate-100 dark:border-white/10 rounded-full py-3 ${
            Icon ? "pl-10" : "pl-4"
          } pr-10 text-sm font-medium text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/[0.08] focus:border-blue-600 focus:shadow-lg focus:shadow-blue-600/10 transition-all outline-none cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-blue-200/45 pointer-events-none" />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [facultyList, setFacultyList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [section, setSection] = useState("add");
  const [addTab, setAddTab] = useState("faculty");

  const [facultyForm, setFacultyForm] = useState(emptyFaculty);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [submitting, setSubmitting] = useState(null);
  const [alert, setAlert] = useState(null);

  const [openBranch, setOpenBranch] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(null);

  async function loadLists() {
    setFetching(true);
    try {
      const [f, s] = await Promise.all([adminApi.listFaculty(), adminApi.listStudents()]);
      setFacultyList(f.faculty);
      setStudentList(s.students);
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadLists();
    const onFocus = () => loadLists();
    const onVisible = () => {
      if (document.visibilityState === "visible") loadLists();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  function handleFacultyChange(e) {
    setFacultyForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  function handleStudentChange(e) {
    setStudentForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submitFaculty(e) {
    e.preventDefault();
    setSubmitting("faculty");
    setAlert(null);
    try {
      const res = await adminApi.createFaculty(facultyForm);
      setAlert({ type: "success", message: res.message });
      setFacultyForm(emptyFaculty);
      loadLists();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSubmitting(null);
    }
  }

  async function submitStudent(e) {
    e.preventDefault();
    setSubmitting("student");
    setAlert(null);
    try {
      const res = await adminApi.createStudent(studentForm);
      setAlert({ type: "success", message: res.message });
      setStudentForm(emptyStudent);
      loadLists();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSubmitting(null);
    }
  }

  function startEdit(s) {
    setEditing(s._id);
    setEditForm({
      name: s.name,
      email: s.email,
      rollNumber: s.rollNumber || "",
      branch: s.branch || "",
      password: "",
    });
  }
  function cancelEdit() {
    setEditing(null);
    setEditForm(null);
  }
  function handleEditChange(e) {
    setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  async function saveEdit(id) {
    if (editForm && !editForm.branch) {
      setAlert({ type: "error", message: "Please select a branch." });
      return;
    }
    setSubmitting("edit");
    setAlert(null);
    try {
      const res = await adminApi.updateStudent(id, editForm);
      setAlert({ type: "success", message: res.message });
      cancelEdit();
      loadLists();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSubmitting(null);
    }
  }
  async function removeStudent(s) {
    if (!window.confirm(`Delete the student account for ${s.name}?`)) return;
    setSubmitting("delete");
    setAlert(null);
    try {
      const res = await adminApi.deleteStudent(s._id);
      setAlert({ type: "success", message: res.message });
      loadLists();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <Navbar title="Admin Dashboard" />

      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-fade-in-up flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back, <span className="text-blue-800 dark:text-blue-300">{user?.name?.split(" ")[0]}</span>
            </h1>
            <p className="text-slate-500 dark:text-blue-200/50 text-sm font-medium mt-1">Manage faculty and student accounts from here.</p>
          </div>
          <button
            onClick={loadLists}
            disabled={fetching}
            title="Refresh accounts"
            className="shrink-0 flex items-center gap-1.5 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] hover:border-blue-300 dark:hover:border-blue-500/40 text-slate-600 dark:text-blue-200/70 text-xs font-bold px-3.5 py-2 rounded-full shadow-sm transition disabled:opacity-60 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${fetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <Alert type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up">
          <StatCard label="Total Faculty" value={facultyList.length} icon={BookUser} />
          <StatCard label="Total Students" value={studentList.length} icon={GraduationCap} />
          <StatCard label="Total Accounts" value={facultyList.length + studentList.length + 1} icon={Users} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <aside className="w-full lg:w-52 shrink-0 animate-fade-in-up">
            <div className="flex lg:flex-col gap-1 lg:gap-2 lg:sticky lg:top-24">
              {SECTIONS.map((t) => {
                const Icon = t.icon;
                const active = section === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSection(t.id)}
                    className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 lg:border-b-0 lg:border-l-4 ${
                      active
                        ? "border-blue-950 text-blue-900 dark:border-blue-400 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-500/10"
                        : "border-transparent text-slate-500 dark:text-blue-200/50 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="flex-1 min-w-0 w-full space-y-8">
            {section === "add" ? (
              <div className="animate-fade-in-up">
                <GlassCard
                  title="Add Account"
                  subtitle={
                    addTab === "faculty"
                      ? "Create login credentials for a faculty member"
                      : "Students receive a unique QR identifier"
                  }
                  icon={UserPlus}
                >
                  <div className="flex overflow-hidden border-2 border-slate-100 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/[0.04] mb-5">
                    {ROLE_TABS.map((r, i) => {
                      const Icon = r.icon;
                      const active = addTab === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setAddTab(r.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            i > 0 ? "border-l-2 border-slate-200 dark:border-white/10" : ""
                          } ${
                            active
                              ? `${r.activeCls}`
                              : "text-slate-500 dark:text-blue-200/60 hover:bg-white dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {r.label}
                        </button>
                      );
                    })}
                  </div>

                  {addTab === "faculty" ? (
                    <form className="space-y-4" onSubmit={submitFaculty}>
                      <FormInput label="Full Name" icon={User} name="name" placeholder="e.g. Dr. Priya Sharma" value={facultyForm.name} onChange={handleFacultyChange} required />
                      <FormInput label="Email" icon={Mail} type="email" name="email" placeholder="faculty@cdc.ac.in" value={facultyForm.email} onChange={handleFacultyChange} required />
                      <FormInput label="Initial Password" icon={Lock} type="password" name="password" placeholder="Min 6 characters" value={facultyForm.password} onChange={handleFacultyChange} required minLength={6} />
                      <button
                        type="submit"
                        disabled={submitting === "faculty"}
                        className="w-full bg-blue-950 hover:bg-blue-900 dark:bg-blue-900 dark:hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-sm rounded-full py-3 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting === "faculty" ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        Create Faculty
                      </button>
                    </form>
                  ) : (
                    <form className="space-y-4" onSubmit={submitStudent}>
                      <FormInput label="Full Name" icon={User} name="name" placeholder="e.g. Rahul Verma" value={studentForm.name} onChange={handleStudentChange} required />
                      <FormSelect label="Branch" icon={Building2} name="branch" value={studentForm.branch} onChange={handleStudentChange} required>
                        <option value="" disabled>
                          Select branch
                        </option>
                        {BRANCHES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </FormSelect>
                      <FormInput label="Email" icon={Mail} type="email" name="email" placeholder="student@cdc.ac.in" value={studentForm.email} onChange={handleStudentChange} required />
                      <FormInput label="Roll Number" icon={IdCard} name="rollNumber" placeholder="e.g. 26951A1212" value={studentForm.rollNumber} onChange={handleStudentChange} required />
                      <FormInput label="Initial Password" icon={Lock} type="password" name="password" placeholder="Min 6 characters" value={studentForm.password} onChange={handleStudentChange} required minLength={6} />
                      <button
                        type="submit"
                        disabled={submitting === "student"}
                        className="w-full bg-blue-950 hover:bg-blue-900 dark:bg-blue-900 dark:hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-sm rounded-full py-3 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting === "student" ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        Create Student
                      </button>
                    </form>
                  )}
                </GlassCard>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
                  <GlassCard title="Faculty Accounts" subtitle={`${facultyList.length} account(s)`} icon={Users}>
                    {fetching ? (
                      <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" /></div>
                    ) : facultyList.length === 0 ? (
                      <p className="text-slate-400 dark:text-blue-200/40 text-sm text-center py-10 font-medium">No faculty accounts yet.</p>
                    ) : (
                      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                        {facultyList.map((f) => (
                          <div key={f._id} className="flex items-center justify-between bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3">
                            <div className="min-w-0">
                              <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{f.name}</div>
                              <div className="text-slate-500 dark:text-blue-200/40 text-xs truncate">{f.email}</div>
                            </div>
                            <span className="bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ml-3">Faculty</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>

                  <GlassCard title="Student Accounts" subtitle={`${studentList.length} account(s)`} icon={Users}>
                    {fetching ? (
                      <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" /></div>
                    ) : studentList.length === 0 ? (
                      <p className="text-slate-400 dark:text-blue-200/40 text-sm text-center py-10 font-medium">No student accounts yet.</p>
                    ) : (
                      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                        {studentList.map((s) => (
                          <div key={s._id} className="flex items-center justify-between bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-3">
                            <div className="min-w-0">
                              <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{s.name}</div>
                              <div className="text-slate-500 dark:text-blue-200/40 text-xs truncate">{s.email}</div>
                            </div>
                            <div className="text-right shrink-0 ml-3 flex flex-col items-end gap-1">
                              <span className="bg-slate-900 dark:bg-white/[0.1] text-white dark:text-slate-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{s.rollNumber}</span>
                              {s.branch && (
                                <span className="bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-blue-200/60 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{s.branch}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>

                <div className="animate-fade-in-up">
                  <GlassCard title="Students by Branch" subtitle="Click a branch to view its students" icon={Building2}>
                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                      {[
                        ...BRANCHES.map((b) => ({ branch: b, list: studentList.filter((s) => s.branch === b) })),
                        ...(studentList.some((s) => !s.branch || !BRANCHES.includes(s.branch))
                          ? [{ branch: "Unassigned", list: studentList.filter((s) => !s.branch || !BRANCHES.includes(s.branch)) }]
                          : []),
                      ].map(({ branch, list }) => {
                        const open = openBranch === branch;
                        return (
                          <div key={branch} className="border border-slate-100 dark:border-white/[0.06] rounded-2xl overflow-hidden bg-slate-50/60 dark:bg-white/[0.02]">
                            <button
                              type="button"
                              onClick={() => setOpenBranch(open ? null : branch)}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-white/[0.04] transition"
                            >
                              <span className="text-slate-900 dark:text-white text-sm font-bold">{branch}</span>
                              <span className="flex items-center gap-2">
                                <span className="bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                  {list.length} student{list.length === 1 ? "" : "s"}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                              </span>
                            </button>

                            {open && (
                              <div className="px-3 pb-3 space-y-2">
                                {list.length === 0 ? (
                                  <p className="text-slate-400 dark:text-blue-200/40 text-xs font-medium px-1 py-2">No students in this branch yet.</p>
                                ) : (
                                  list.map((s) =>
                                    editing === s._id ? (
                                      <div key={s._id} className="bg-white dark:bg-white/[0.05] border-2 border-blue-200 dark:border-blue-500/30 rounded-2xl p-3 space-y-2">
                                        <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Full name" className={editInputCls} />
                                        <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" className={editInputCls} />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          <input name="rollNumber" value={editForm.rollNumber} onChange={handleEditChange} placeholder="Roll number" className={editInputCls} />
                                          <select name="branch" value={editForm.branch} onChange={handleEditChange} className={`${editInputCls} cursor-pointer`}>
                                            <option value="" disabled>
                                              Branch
                                            </option>
                                            {BRANCHES.map((b) => (
                                              <option key={b} value={b}>
                                                {b}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <input name="password" type="password" value={editForm.password} onChange={handleEditChange} placeholder="New password (optional)" className={editInputCls} />
                                        <div className="flex justify-end gap-2">
                                          <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="flex items-center gap-1 text-slate-500 dark:text-blue-200/60 text-xs font-bold px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition cursor-pointer"
                                          >
                                            <X className="w-3.5 h-3.5" /> Cancel
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => saveEdit(s._id)}
                                            disabled={submitting === "edit"}
                                            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl disabled:opacity-60 transition cursor-pointer"
                                          >
                                            {submitting === "edit" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div key={s._id} className="flex items-center justify-between gap-3 bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] rounded-2xl px-4 py-2.5">
                                        <div className="min-w-0">
                                          <div className="text-slate-900 dark:text-white text-sm font-bold truncate">{s.name}</div>
                                          <div className="text-slate-500 dark:text-blue-200/40 text-xs truncate">
                                            {s.rollNumber} • {s.email}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                          <button
                                            type="button"
                                            onClick={() => startEdit(s)}
                                            title="Edit"
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-blue-200/50 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition cursor-pointer"
                                          >
                                            <Pencil className="w-4 h-4" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => removeStudent(s)}
                                            title="Delete"
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-blue-200/50 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition cursor-pointer"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
