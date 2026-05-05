import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";
import useAuth from "../context/useAuth";
function Login() {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsteacher] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  function AddStudent() {
    !isStudent && setIsStudent(true);
    isTeacher && setIsteacher(false);
    isAdmin && setIsadmin(false);
  }

  function AddTeacher() {
    !isTeacher && setIsteacher(true);
    isStudent && setIsStudent(false);
    isAdmin && setIsadmin(false);
  }

  function AddAdmin() {
    !isAdmin && setIsadmin(true);
    isStudent && setIsStudent(false);
    isTeacher && setIsteacher(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const payload = {
      role: isStudent ? "student" : isTeacher ? "teacher" : "admin",
      password,
    };

    if (isStudent) {
      payload.studentId = studentId;
    } else {
      payload.email = email;
    }

    try {
      const res = await http.post("/", payload);
      const user = res.data.user;
      setUser(user);
      console.log(res);
      if (user.role === "student") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "teacher") {
        navigate("/dashboard_teacher", { replace: true });
      } else {
        navigate("/dashboard_admin", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    }
  }
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black text-center">Log in</h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          CampusSync, where all you need await.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="flex gap-6 justify-center mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                className="h-5 w-5 accent-sky-200 hover:cursor-pointer"
                onClick={AddStudent}
              />
              <span className="text-sm text-gray-600">Student</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="teacher"
                className="h-5 w-5 accent-sky-200 hover:cursor-pointer"
                onClick={AddTeacher}
              />
              <span className="text-sm text-gray-600">Teacher</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                className="h-5 w-5 accent-sky-200 hover:cursor-pointer"
                onClick={AddAdmin}
              />
              <span className="text-sm text-gray-600">Admin</span>
            </label>
          </div>

          {isStudent && (
            <input
              type="text"
              placeholder="Student ID (NPM)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          )}

          {!isStudent && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
