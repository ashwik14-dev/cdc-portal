import { ShieldCheck, Users, Lock } from "lucide-react";
import PublicNav from "../components/PublicNav";

const cards = [
  {
    icon: ShieldCheck,
    gradient: "from-blue-600 to-indigo-600",
    title: "Centralized Accounts",
    text: "One place for the Admin to provision faculty and student logins, keeping records consistent and easy to manage.",
  },
  {
    icon: Users,
    gradient: "from-indigo-600 to-violet-600",
    title: "Role-Based Access",
    text: "Admins, Faculty and Students each get a tailored dashboard. Sensitive actions are locked to the Admin role only.",
  },
  {
    icon: Lock,
    gradient: "from-cyan-600 to-blue-600",
    title: "Secure Authentication",
    text: "Passwords are hashed with bcrypt and sessions use signed JWTs. Student QR codes carry a non-sensitive identifier only.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <PublicNav />

      <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-center mb-7">
          <img
            src="/institute_of_aeronautical_engineering_logo.jpg"
            alt="Institute of Aeronautical Engineering"
            className="w-[120px] h-[120px] object-contain rounded-3xl shadow-2xl shadow-slate-300/60 dark:shadow-black/40"
          />
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full mb-4">
          About
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          About CDC Portal
        </h1>
        <p className="text-slate-500 dark:text-blue-200/60 text-[15px] font-medium leading-relaxed max-w-2xl mb-10">
          CDC Portal is a centralized, role-based account management system built for the Career
          Development Centre. Admins create faculty and student accounts, while each role sees only
          what it is allowed to see — secured end to end with JWT authentication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 shadow-xl shadow-slate-200/60 dark:shadow-none"
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-extrabold text-base mb-1.5">{c.title}</h3>
                <p className="text-slate-500 dark:text-blue-200/55 text-[13px] font-medium leading-relaxed">{c.text}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
