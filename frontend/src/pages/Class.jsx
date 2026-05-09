import { useEffect, useState } from "react";
import http from "../api/http";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function AddClass() {
  const [className, setClassName] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function getTeachers() {
      try {
        const res = await http.get("/auth/teachers");
        //console.log(res);
        setTeachers(res.data.teachers);
      } catch {
        setTeachers([]);
      }
    }

    getTeachers();
  }, []);

  useEffect(() => {
    async function getStudents() {
      try {
        const res = await http.get("auth/students");
        setStudents(res.data.students);
      } catch {
        setStudents([]);
      }
    }

    getStudents();
  }, []);

  function addTeacher(id) {
    if (!id) return;

    if (!selectedTeacherIds.includes(id)) {
      setSelectedTeacherIds([...selectedTeacherIds, id]);
    }
  }

  function addStudent(id) {
    if (!id) return;

    if (!selectedStudentIds.includes(id)) {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  }

  function removeTeacher(id) {
    setSelectedTeacherIds(
      selectedTeacherIds.filter((teacherId) => teacherId !== id),
    );
  }

  function removeStudent(id) {
    setSelectedStudentIds(
      selectedStudentIds.filter((studentId) => studentId !== id),
    );
  }

  async function handleAddClass(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      name: className,
      teacherIds: selectedTeacherIds,
      studentIds: selectedStudentIds,
    };

    try {
      await http.post("/classes", payload);
      setSuccess("A class was successfully added");
      setClassName("");
      setSelectedTeacherIds([]);
      setSelectedStudentIds([]);
    } catch (err) {
      setError(err.response?.data?.message || "Class adding error");
    }
  }

  return (
    <>
      <Header title="Dashboard" showCard={false} title={"Adding a class"} />
      <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Add a class
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2">
            CampusSync, where all you need await.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 mt-4">
              {success}
            </div>
          )}

          <form onSubmit={handleAddClass} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Name of the class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <select
              onChange={(e) => addTeacher(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select teachers</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name} - {teacher._id}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {selectedTeacherIds.map((id) => {
                const teacher = teachers.find((t) => t._id === id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => removeTeacher(id)}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700"
                  >
                    {teacher?.name || id} ×
                  </button>
                );
              })}
            </div>

            <select
              onChange={(e) => addStudent(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select students</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} - {student.studentId}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {selectedStudentIds.map((id) => {
                const student = students.find((s) => s._id === id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => removeStudent(id)}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700"
                  >
                    {student?.name || id} ×
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-md"
            >
              Add the class
            </button>
          </form>
          <div className="mt-4 text-black">
            <Link to={"/dashboard_admin"}> Back to the dashboard</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddClass;
