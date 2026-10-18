import { QrCode, ScanLine, User, Trophy, CircleCheckBig, Terminal, Wifi, Signal } from "lucide-react";

export default function PhoneMockup({ name = "Student", dept = "CSE (AI & ML) - Sem 6" }) {
  return (
    <div
      className="relative w-full max-w-[260px] h-[50vh] max-h-[580px] min-h-[380px] animate-float"
      style={{ perspective: "1200px" }}
    >
      <div
        className="w-full h-full bg-[#121212] rounded-[2.5rem] p-2 shadow-[30px_20px_60px_-15px_rgba(0,0,0,0.7)] border-[6px] border-[#1f1f1f] ring-1 ring-white/20 relative"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(5deg) rotateY(12deg)" }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50 pointer-events-none border border-gray-800/50 shadow-md" />

        <div className="w-full h-full rounded-[2.0rem] overflow-hidden relative bg-black shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black w-full h-full overflow-hidden">
            <div className="px-5 pt-4 flex justify-between items-center z-50 absolute top-0 left-0 right-0">
              <span className="text-[9px] text-white font-semibold tracking-wider">12:14 PM</span>
              <div className="flex gap-1 items-center text-white">
                <Signal className="w-[11px] h-[11px]" />
                <Wifi className="w-[11px] h-[11px]" />
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="10" x="2" y="7" rx="2" />
                  <line x1="22" x2="22" y1="11" y2="13" />
                  <rect x="4" y="9" width="8.4" height="6" rx="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>

            <div className="flex-1 relative flex flex-col h-full">
              <div className="flex-1 flex flex-col p-4 pt-12 h-full justify-between">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-white text-lg font-bold tracking-tight">Hello {name}</h2>
                    <p className="text-gray-400 text-[10px] font-medium mt-0.5">{dept}</p>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md shadow-lg">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 flex items-center justify-between shadow-xl shadow-blue-900/30 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                      <QrCode className="w-[18px] h-[18px] text-white" />
                    </div>
                    <div className="text-white font-bold text-sm">My QR Code</div>
                  </div>
                  <ScanLine className="w-4 h-4 text-white/50" />
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-[#1a1f2e]/80 p-2 rounded-xl border border-white/5 backdrop-blur-md flex flex-col justify-between h-16">
                    <span className="text-gray-400 text-[8px] uppercase font-bold tracking-wider">Attendance</span>
                    <div className="flex justify-between items-end">
                      <div className="text-lg font-bold text-white leading-none">
                        92<span className="text-[10px] text-gray-500 font-medium">%</span>
                      </div>
                      <div className="bg-green-500/20 text-green-400 p-0.5 rounded">
                        <CircleCheckBig className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1a1f2e]/80 p-2 rounded-xl border border-white/5 backdrop-blur-md flex flex-col justify-between h-16">
                    <span className="text-gray-400 text-[8px] uppercase font-bold tracking-wider">Rank</span>
                    <div className="flex justify-between items-end">
                      <div className="text-lg font-bold text-white leading-none">#05</div>
                      <div className="bg-amber-500/20 text-amber-400 p-0.5 rounded">
                        <Trophy className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-3 backdrop-blur-sm flex-1 flex flex-col justify-center mt-2 min-h-[100px]">
                  <div className="flex items-center gap-1 mb-2">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span className="text-gray-300 font-bold text-[10px] uppercase">Leaderboard</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-bold text-black shadow-lg">1</div>
                      <div className="flex-1 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[92%]" />
                      </div>
                      <span className="text-[8px] font-mono text-amber-400">2040</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-[8px] font-bold text-black">2</div>
                      <div className="flex-1 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 w-[85%]" />
                      </div>
                      <span className="text-[8px] font-mono text-gray-400">1850</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-700 rounded-full flex items-center justify-center text-[8px] font-bold text-white">3</div>
                      <div className="flex-1 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-700 w-[78%]" />
                      </div>
                      <span className="text-[8px] font-mono text-orange-700">1620</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 bg-[#1a1f2e]/60 rounded-xl p-2 border border-white/5 flex items-center gap-2 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-cyan-300 border border-white/5">
                    <Terminal className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-white text-[10px] font-bold">CDC Portal</div>
                    <div className="text-gray-400 text-[8px]">Active - Secure Login</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 rounded-[2.0rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50" />
        </div>
      </div>
    </div>
  );
}
