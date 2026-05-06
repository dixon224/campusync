//import { Calendar, Bell, Info, Menu, LayoutGrid, Badge } from "lucide-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Card from "./components/Card";
import Schedule from "./pages/Schedule";
import { Routes, Route } from "react-router-dom";
import Notifications from "./pages/Notifications";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardTeacher from "./pages/DashboardTeacher";
import useAuth from "./context/UseAuth";
function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/signup"
        element={user && user.role === "admin" && <SignUp />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard_admin" element={<DashboardAdmin />} />
      <Route path="/dashboard_teacher" element={<DashboardTeacher />} />
      <Route path="/card" element={<Card />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/notifs" element={<Notifications />} />
    </Routes>
  );
}

export default App;
