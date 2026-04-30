//import { Calendar, Bell, Info, Menu, LayoutGrid, Badge } from "lucide-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Card from "./components/Card";
import Schedule from "./pages/Schedule";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/card" element={<Card />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
