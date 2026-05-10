import { useEffect, useState } from "react";
import http from "../api/http";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useAuth from "../context/UseAuth";

function AddSchedule() {
  const { user } = useAuth();

  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [description, setDescription] = useState("");
  const [classroom, setClassroom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [modif, setModif] = useState(false);
  const [schedId, setSchedId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedClass = classes.find((classe) => classe._id === classId);
  const availableTeachers = selectedClass?.teachers || [];

  useEffect(() => {
    async function loadData() {
      try {
        const classesRes = await http.get("/classes/AllClasses");
        setClasses(classesRes.data.classes);

        const schedulesRes = await http.get("/schedules/");
        setSchedules(schedulesRes.data.schedules);
      } catch {
        setClasses([]);
        setSchedules([]);
      }
    }

    loadData();
  }, []);

  async function refreshSchedules() {
    try {
      const res = await http.get("/schedules/");
      setSchedules(res.data.schedules);
    } catch {
      setSchedules([]);
    }
  }

  function handleClassChange(e) {
    setClassId(e.target.value);
    setTeacherId("");
  }

  function resetForm() {
    setClassId("");
    setTeacherId("");
    setDescription("");
    setClassroom("");
    setStartTime("");
    setEndTime("");
    setSchedId("");
  }

  async function handleAddSchedule(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const payload = {
      classId,
      teacherId,
      description,
      classroom,
      startTime,
      endTime,
    };

    try {
      const res = await http.post("/schedules", payload);

      setSuccess(res.data?.message || "Schedule successfully added");
      resetForm();
      refreshSchedules();
    } catch (err) {
      setError(err.response?.data?.message || "Schedule adding error");
    }
  }

  async function handleModifSchedule(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!schedId) {
      setError("Please select a schedule to modify");
      return;
    }

    const payload = {
      classId,
      teacherId,
      description,
      classroom,
      startTime,
      endTime,
    };

    try {
      const res = await http.put(`/schedules/${schedId}`, payload);

      setSuccess(res.data?.message || "Schedule successfully modified");
      resetForm();
      refreshSchedules();
    } catch (err) {
      setError(err.response?.data?.message || "Schedule update error");
    }
  }

  function handleScheduleSelect(e) {
    const selectedScheduleId = e.target.value;
    setSchedId(selectedScheduleId);

    const selectedSchedule = schedules.find(
      (schedule) => schedule._id === selectedScheduleId,
    );

    if (!selectedSchedule) return;

    setClassId(selectedSchedule.class?._id || "");
    setTeacherId(selectedSchedule.teacher?._id || "");
    setDescription(selectedSchedule.description || "");
    setClassroom(selectedSchedule.classroom || "");
    setStartTime(selectedSchedule.startTime?.slice(0, 16) || "");
    setEndTime(selectedSchedule.endTime?.slice(0, 16) || "");
  }

  function modifySchedule() {
    setModif(!modif);
    setError("");
    setSuccess("");
    resetForm();
  }

  return (
    <>
      <Header title="Scheduling a class" showCard={false} />

      <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            {modif ? "Modify a schedule" : "Schedule a class"}
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2">
            Choose a class, teacher, room and time.
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

          <form
            onSubmit={modif ? handleModifSchedule : handleAddSchedule}
            className="mt-6 space-y-4"
          >
            {modif && (
              <select
                value={schedId}
                onChange={handleScheduleSelect}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
              >
                <option value="">Select schedule to modify</option>

                {schedules.map((schedule) => (
                  <option key={schedule._id} value={schedule._id}>
                    {schedule.class?.name || "Unknown class"} -{" "}
                    {new Date(schedule.startTime).toLocaleDateString()}{" "}
                    {new Date(schedule.startTime).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
            )}

            <select
              value={classId}
              onChange={handleClassChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select class</option>

              {classes.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe.name}
                </option>
              ))}
            </select>

            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              disabled={!classId}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition disabled:text-gray-400 disabled:cursor-not-allowed focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select teacher</option>

              {availableTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name} - {teacher.email}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="text"
              placeholder="Classroom"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-md"
            >
              {modif ? "Modify schedule" : "Add schedule"}
            </button>
          </form>

          <div className="mt-4 text-black flex items-center justify-between gap-4 text-sm">
            <Link
              to={
                user && user.role === "admin"
                  ? "/dashboard_admin"
                  : "/dashboard_teacher"
              }
            >
              Back to dashboard
            </Link>

            <button onClick={modifySchedule} className="hover:cursor-pointer">
              {modif ? "Add a schedule" : "Modify a schedule"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSchedule;
