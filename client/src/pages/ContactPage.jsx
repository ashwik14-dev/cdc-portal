import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PublicNav from "../components/PublicNav";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Institute+of+Aeronautical+Engineering+IARE+Dundigal+Hyderabad";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0F19] font-inter">
      <PublicNav />

      <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full mb-4">
          Contact
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Get in touch
        </h1>
        <p className="text-slate-500 dark:text-blue-200/60 text-[15px] font-medium leading-relaxed max-w-2xl mb-10">
          Have a question about your CDC Portal account or need help getting access? Reach out to the
          Career Development Centre team.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-4">
        {/* Big email card */}
        <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 dark:shadow-none">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-slate-600 dark:text-blue-200/70 mb-1">
                Email
              </div>
              <h3 className="text-slate-900 dark:text-white font-extrabold text-lg mb-1.5">General Enquiries</h3>
              <p className="text-slate-600 dark:text-slate-200/85 text-[14px] font-medium leading-relaxed">
                The general email address for the Institute of Aeronautical Engineering (IARE) is{" "}
                <a href="mailto:info@iare.ac.in" className="text-blue-600 dark:text-blue-400 font-bold no-underline hover:underline">
                  info@iare.ac.in
                </a>
                . You can message us anytime — we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>

          {/* Transport / admin support */}
          <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 shadow-xl shadow-slate-200/60 dark:shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0 shadow-lg">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-slate-600 dark:text-blue-200/70">
                Phone
              </div>
            </div>
            <h3 className="text-slate-900 dark:text-white font-extrabold text-lg mb-1.5">Admin Support</h3>
            <a href="tel:+919154678975" className="block text-slate-900 dark:text-white text-[15px] font-bold py-1.5 no-underline hover:text-blue-600 dark:hover:text-blue-400">
              +91 91546 78975
            </a>
            <a href="tel:+914029705852" className="block text-slate-900 dark:text-white text-[15px] font-bold py-1.5 no-underline hover:text-blue-600 dark:hover:text-blue-400">
              +91 40 2970 5852
            </a>
            <p className="text-slate-600 dark:text-slate-200/70 text-[13px] font-medium leading-relaxed mt-3">
              Contact the admin if your account is not working or has been blocked.
            </p>
          </div>

          {/* Address → Google Maps */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="group block bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] hover:border-blue-200 dark:hover:border-blue-500/40 rounded-3xl p-6 shadow-xl shadow-slate-200/60 dark:shadow-none transition-all hover:-translate-y-0.5 no-underline"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-slate-600 dark:text-blue-200/70">
                Locate
              </div>
            </div>
            <h3 className="text-slate-900 dark:text-white font-extrabold text-lg mb-1.5">Visit Us</h3>
            <p className="text-slate-600 dark:text-slate-200/85 text-[14px] font-medium leading-relaxed">
              IARE Campus, Dundigal, Hyderabad, Telangana 500043
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-blue-600 dark:text-blue-400 text-[13px] font-bold">
              Where is IARE? Open in Google Maps →
            </span>
          </a>

        {/* Office hours card */}
        <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 dark:shadow-none">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-slate-600 dark:text-blue-200/70 mb-1">
                Hours
              </div>
              <h3 className="text-slate-900 dark:text-white font-extrabold text-lg mb-1.5">Office Hours</h3>
              <p className="text-slate-600 dark:text-slate-200/85 text-[14px] font-medium leading-relaxed">
                The CDC office is open{" "}
                <span className="font-bold text-slate-800 dark:text-white">
                  Monday to Friday, 9:00 AM – 5:00 PM
                </span>
                . Walk in anytime during these hours — no appointment needed. We're happy to help you in
                person.
              </p>
            </div>
          </div>
        </div>

        </div>
        <div>
        {/* Send message form (display only) */}
        <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 dark:shadow-none">
          <h3 className="text-slate-900 dark:text-white font-extrabold text-lg mb-1">Send Message</h3>
          <p className="text-slate-500 dark:text-slate-200/70 text-[14px] font-medium mb-5">
            Fill the form and the admin desk will get back to you.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-200/70 mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/35 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-200/70 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/35 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-200/70 mb-1.5">
                Branch
              </label>
              <select
                defaultValue=""
                className="w-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition"
              >
                <option value="">Select your branch</option>
                <option>CSE</option>
                <option>CSE + AI &amp; ML</option>
                <option>CSE + Data Science</option>
                <option>IT</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>CIVIL</option>
                <option>MECH</option>
                <option>AERONAUTICAL</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-blue-200/70 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message..."
                className="w-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/35 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 transition resize-y"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:shadow-xl transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}
