import { useEffect, useState } from "react";
import http from "../api/http";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function JoinClass() {
  const [classes, setClasses] = useState([]);

  const [selectedClassesIds, setSelectedClassesIds] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function getClasses() {
      try {
        const res = await http.get("classes/AllClasses");
        console.log(res);
        //console.log(res);
        setClasses(res.data.classes);
      } catch {
        setClasses([]);
      }
    }

    getClasses();
  }, []);

  function addClass(id) {
    if (!id) return;

    if (!selectedClassesIds.includes(id)) {
      setSelectedClassesIds([...selectedClassesIds, id]);
    }
  }

  function removeClass(id) {
    setSelectedClassesIds(
      selectedClassesIds.filter((classId) => classId !== id),
    );
  }

  async function handeJoinClass(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      classIds: selectedClassesIds,
    };

    try {
      await http.post("/classes/join", payload);
      setSuccess("A class was successfully added");
      setSelectedClassesIds([]);
    } catch (err) {
      setError(err.response?.data?.message || "Class adding error");
    }
  }

  return (
    <>
      <Header title="Dashboard" showCard={false} title={"Joining a class"} />
      <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Join a class
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

          <form onSubmit={handeJoinClass} className="mt-6 space-y-4">
            <select
              onChange={(e) => addClass(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select Classes</option>
              {classes.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe.name}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {selectedClassesIds.map((id) => {
                const classe = classes.find((t) => t._id === id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => removeClass(id)}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700"
                  >
                    {classe?.name || id} ×
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98] shadow-md"
            >
              Join the class
            </button>
          </form>
          <div className="mt-4 text-black">
            <Link to={"/dashboard"}> Back to the dashboard</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinClass;
