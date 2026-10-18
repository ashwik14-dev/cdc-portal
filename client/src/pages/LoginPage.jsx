import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ShieldCheck, BookUser, GraduationCap, Briefcase, Handshake, CircleCheckBig } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import PhoneMockup from "../components/PhoneMockup";
import PublicNav from "../components/PublicNav";

function firstNameOf(value) {
  const local = (value || "").split("@")[0];
  const first = local.split(/[._\-+\s]/)[0];
  if (!first) return "";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default function LoginPage() {
  const { login, completeLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("admin");
  const [previewName, setPreviewName] = useState("");
  const [greeting, setGreeting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPreviewName(firstNameOf(email));
  }, [email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login(email, password, { defer: true });
      setGreeting(data.user);
      await new Promise((r) => setTimeout(r, 900));
      completeLogin(data.user);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 lg:bg-[#0B0F19] font-inter text-slate-800 dark:text-slate-200 selection:bg-blue-200">
      <PublicNav />

      <div className="flex-1 flex flex-col lg:flex-row w-full relative">
        {/* Left hero — dark showcase (always dark) */}
        <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col justify-start items-center text-white p-6 pt-16 bg-[#0B0F19]">
          <div className="absolute inset-0 bg-[url('/panel-photo.jpg')] bg-cover bg-center opacity-55 z-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/25 via-[#0B0F19]/55 to-[#0B0F19]/75 z-0" />
          <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />

          <div className="relative z-10 w-full max-w-xl flex flex-col items-center justify-start h-full">
            <div className="mb-8 text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white border border-white/60 rounded-full px-4 py-1.5 mb-5 shadow-lg shadow-black/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] text-[#0B0F19] font-bold uppercase tracking-widest">
                  CDC Portal
                </span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-semibold mb-2 text-white">Career Development Centre</h1>
              <p className="text-sm text-blue-200/80 leading-relaxed max-w-md mx-auto">
                A centralized digital ecosystem built to simplify career development and placement processes,
                enabling students, faculty, and administrators to efficiently manage their respective
                activities and Responsibilities.
              </p>
            </div>

            {/* Career flow: briefcase → student → handshake */}
            {role !== "student" && !greeting && (
            <div className="flex items-center justify-center mt-12 mb-10 animate-fade-in-up select-none" aria-hidden="true">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/60 bg-white/15 backdrop-blur-sm shadow-[0_0_35px_rgba(255,255,255,0.5)] animate-pulse-glow">
                <span className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
                <Briefcase className="relative w-9 h-9 text-white" strokeWidth={1.8} />
              </div>
              <span className="h-0.5 w-14 md:w-20 bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/60 bg-white/15 backdrop-blur-sm shadow-[0_0_35px_rgba(255,255,255,0.5)] animate-pulse-glow" style={{ animationDelay: "0.6s" }}>
                <span className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
                <GraduationCap className="relative w-9 h-9 text-white" strokeWidth={1.8} />
              </div>
              <span className="h-0.5 w-14 md:w-20 bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/60 bg-white/15 backdrop-blur-sm shadow-[0_0_35px_rgba(255,255,255,0.5)] animate-pulse-glow" style={{ animationDelay: "1.2s" }}>
                <span className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
                <Handshake className="relative w-9 h-9 text-white" strokeWidth={1.8} />
              </div>
            </div>
            )}

            {(role === "student" || greeting) && (
              <PhoneMockup
                name={greeting ? greeting.name?.split(" ")[0] : previewName || "Student"}
                dept={
                  greeting
                    ? `${greeting.branch || (greeting.role ? greeting.role.charAt(0).toUpperCase() + greeting.role.slice(1) : "User")} \u2022 CDC Portal`
                    : "CSE (AI & ML) - Sem 6"
                }
                branch={greeting ? greeting.branch || "\u2014" : "CSE"}
              />
            )}
          </div>
        </div>

        {/* Right panel — light by default, dark in dark mode */}
        <div className="w-full lg:w-[40%] bg-white dark:bg-[#0B0F19] relative overflow-hidden z-20 shadow-2xl flex flex-col justify-center transition-all duration-500 ease-in-out lg:dark:border-l lg:dark:border-purple-500/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-[180px] h-[360px] rounded-l-full bg-[#EAF3FF] dark:bg-blue-500/5"
          />
          <div className="flex flex-col justify-center items-center p-6 w-full h-full relative z-10">
            <div className="w-full max-w-sm relative z-10">
              <div className="mb-6 flex justify-center">
                <img src="/iare-logo.png" alt="CDC Portal" className="w-[300px] max-w-full h-[100px] object-fill" />
              </div>

              <div className="mb-6 text-center">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                  Sign In
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-blue-200/60 font-medium">
                  Enter your credentials to continue.
                </p>
              </div>

              <div className="mb-4 space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-blue-200/60 ml-3 uppercase tracking-wider">
                  Role
                </label>
                <div className="flex overflow-hidden border-2 border-slate-100 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.06]">
                  {[
                    { id: "admin", label: "Admin", icon: ShieldCheck },
                    { id: "faculty", label: "Faculty", icon: BookUser },
                    { id: "student", label: "Student", icon: GraduationCap },
                  ].map((r, i) => {
                    const Icon = r.icon;
                    const active = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          i > 0 ? "border-l-2 border-slate-100 dark:border-white/10" : ""
                        } ${
                          active
                            ? "bg-gradient-to-r from-blue-950 to-blue-900 text-white"
                            : "text-slate-500 dark:text-blue-200/60 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {greeting && (
                <div className="mb-4 flex items-start gap-2 bg-green-50 dark:bg-green-500/10 border-2 border-green-200 dark:border-green-500/25 text-green-700 dark:text-green-400 rounded-2xl px-4 py-3 text-xs font-semibold animate-fade-in-up">
                  <CircleCheckBig className="w-4 h-4 shrink-0 mt-px" />
                  <span>
                    Welcome, {greeting.name?.split(" ")[0]}! Opening your dashboard&hellip;
                  </span>
                </div>
              )}

              {!greeting && error && (
                <div className="mb-4 flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border-2 border-red-100 dark:border-red-500/25 text-red-600 dark:text-red-400 rounded-2xl px-4 py-3 text-xs font-semibold animate-fade-in-up">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="fakeusernameremembered" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="password" name="fakepasswordremembered" className="hidden" tabIndex={-1} autoComplete="off" />
                <FormInput
                  label="Email"
                  icon={Mail}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-blue-200/60 ml-3 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-blue-200/45 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      className="w-full bg-white dark:bg-white/[0.06] border-2 border-slate-100 dark:border-white/10 rounded-full py-3 pl-10 pr-11 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:bg-white dark:focus:bg-white/[0.08] focus:border-blue-600 focus:shadow-lg focus:shadow-blue-600/10 transition-all outline-none"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-start pl-3">
                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-slate-500 dark:text-blue-200/50 text-center">
                    Access is granted only to authorized accounts created by the Admin.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={submitting || !!greeting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full py-3 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-70 disabled:cursor-wait"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {submitting ? "Signing In" : greeting ? "Opening Dashboard" : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
