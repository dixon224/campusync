import { useState } from "react";
import http from "../api/http";

function SignUp() {
  const [isStudent, setIsStudent] = useState(false);
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identification, setIdentification] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function AddStudent() {
    !isStudent && setIsStudent(true);
  }

  function NotStudent() {
    isStudent && setIsStudent(false);
  }
  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();

    formData.append("role", isStudent ? "student" : "teacher");
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);

    if (isStudent) {
      formData.append("npm", studentId);
    }
    if (identification) {
      formData.append("profileImage", identification);
    }

    try {
      await http.post("/auth/register", formData);
      setSuccess(
        `You have successfully registered a ${isStudent ? "student" : "teacher"}`,
      );
      setFullName("");
      setStudentId("");
      setEmail("");
      setPassword("");
      setIdentification(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup error");
      setSuccess("");
    }
  }
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Join CampusSync and manage your student life.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-white-600 text-sm rounded-xl px-4 py-3 mt-4">
            {success}
          </div>
        )}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
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
                onClick={NotStudent}
              />
              <span className="text-sm text-gray-600">Teacher</span>
            </label>
          </div>

          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          {isStudent && (
            <input
              type="text"
              placeholder="Student ID (NPM)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <input
            type="file"
            onChange={(e) => setIdentification(e.target.files[0])}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
