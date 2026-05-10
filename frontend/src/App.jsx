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
import AddClass from "./pages/Class";
import JoinClass from "./pages/JoinClass";
import AddSchedule from "./pages/AddSchedule";
import SendMessage from "./pages/SendMessage";
import Messages from "./pages/Messages";
import MessagesSent from "./pages/MessagesSent";
import Menu from "./pages/Menu";
function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/signup"
        element={user ? user.role === "admin" && <SignUp /> : <Login />}
      />
      <Route
        path="/login"
        element={user ? user.role === "admin" && <DashboardAdmin /> : <Login />}
      />
      <Route
        path="/login"
        element={
          user ? user.role === "admin" && <DashboardTeacher /> : <Login />
        }
      />
      <Route
        path="/login"
        element={user ? user.role === "admin" && <Dashboard /> : <Login />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard_admin" element={<DashboardAdmin />} />
      <Route path="/dashboard_teacher" element={<DashboardTeacher />} />
      <Route path="/card" element={<Card />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/notifs" element={<Notifications />} />
      <Route path="/class" element={<AddClass />} />
      <Route path="/join_class" element={<JoinClass />} />
      <Route path="/add_schedule" element={<AddSchedule />} />
      <Route path="/send_message" element={<SendMessage />} />
      <Route path="/message" element={<Messages />} />
      <Route path="/message_sent" element={<MessagesSent />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
