import { useRef, useState } from "react";
import { Camera, Check, Loader2, Trash2, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { profileApi } from "../api/profile.api";
import { compressImage } from "../utils/image";

export default function PhotoUploader() {
  const { user, updateUser } = useAuth();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const photo = user?.photo;

  async function onFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setSaved(false);
    setBusy(true);
    try {
      const dataUrl = await compressImage(file);
      const res = await profileApi.updatePhoto(dataUrl);
      updateUser({ photo: res.photo });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || "Could not upload the photo.");
    } finally {
      setBusy(false);
    }
  }

  async function onRemove() {
    setError("");
    setSaved(false);
    setBusy(true);
    try {
      await profileApi.removePhoto();
      updateUser({ photo: null });
    } catch (err) {
      setError(err.message || "Could not remove the photo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-slate-200/60 dark:shadow-black/20 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-6 self-start w-full">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/80 to-cyan-600/80 flex items-center justify-center shadow-lg shadow-blue-900/30">
          <Camera className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">Face Photo</h2>
          <p className="text-slate-500 dark:text-blue-200/40 text-[11px] font-medium">Shown when your QR is scanned</p>
        </div>
      </div>

      <div className="relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/30 bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center">
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-slate-300 dark:text-blue-200/25" />
          )}
        </div>
        {busy && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 border-4 border-white dark:border-[#0f1526] flex items-center justify-center shadow-lg">
          <Camera className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={onFile}
      />

      <div className="mt-6 w-full space-y-2.5">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60 text-white font-bold text-xs rounded-full py-3 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          {photo ? "Change Photo" : "Upload Photo"}
        </button>

        {photo && (
          <button
            onClick={onRemove}
            disabled={busy}
            className="w-full bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/15 border border-slate-200 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/30 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-60 rounded-full py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-rose-500 text-[11px] font-semibold text-center">{error}</p>}
      {saved && !error && (
        <p className="mt-3 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> Photo saved
        </p>
      )}

      <p className="text-slate-400 dark:text-blue-200/30 text-[10px] font-medium mt-3 text-center leading-relaxed">
        Use a clear, front-facing photo. It appears on your public verification page.
      </p>
    </div>
  );
}
