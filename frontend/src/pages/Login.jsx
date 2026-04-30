import { useState } from "react";

function Login() {
  const [isStudent, setIsStudent] = useState(false);
  function AddStudent() {
    !isStudent && setIsStudent(true);
  }

  function NotStudent() {
    isStudent && setIsStudent(false);
  }
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black text-center">Log in</h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          CampusSync, where all you need await.
        </p>

        <form className="mt-6 space-y-4">
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

          {isStudent && (
            <input
              type="text"
              placeholder="Student ID (NPM)"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          )}

          {!isStudent && (
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          )}

          <input
            type="password"
            placeholder="Password"
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

export default Login;
