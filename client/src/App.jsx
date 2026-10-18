import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VerifyPage from "./pages/VerifyPage";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 animate-pulse-glow shadow-lg shadow-blue-900/40" />
        <p className="text-blue-200/70 text-sm font-medium tracking-wide">Loading CDC Portal…</p>
      </div>
    </div>
  );
}

const dashboards = {
  admin: AdminDashboard,
  faculty: FacultyDashboard,
  student: StudentDashboard,
};

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  const Dashboard = user ? dashboards[user.role] : null;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/verify/:qrId" element={<VerifyPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {Dashboard ? <Dashboard /> : <Navigate to="/login" replace />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <RoleRoute allowed={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/faculty/*"
        element={
          <RoleRoute allowed={["faculty"]}>
            <FacultyDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <RoleRoute allowed={["student"]}>
            <StudentDashboard />
          </RoleRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
}
