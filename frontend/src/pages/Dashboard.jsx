import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Calendar, Bell, NotebookPen } from "lucide-react";
import BottomNav from "../components/BottomNav";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
import http from "../api/http";

const Dashboard = () => {
  const { user } = useAuth();

  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSchedules() {
      try {
        const res = await http.get("auth/my_schedules");
        setSchedules(res.data.schedules);
      } catch (err) {
        setError(err.response?.data?.message || "An error has occurred");
        setSchedules([]);
      }
    }

    getSchedules();
  }, []);

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayAndTomorrowSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.startTime);

    return isSameDay(scheduleDate, today) || isSameDay(scheduleDate, tomorrow);
  });

  return (
    <>
      <Header title="Dashboard" showTrash={false} showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 px-4 pb-28">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl rounded-3xl bg-white p-5 shadow-md flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-lg font-bold text-black">
              {user ? user.name : "Not Connected"}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-500 max-w-xs">
              {user ? user.role : "Not Connected"}
            </p>

            <p className="mt-2 text-sm text-gray-400">2025/2026</p>
          </div>

          <div className="flex-shrink-0">
            <img
              src="/logo_ui.jpg"
              alt="faculty logo"
              className="w-28 h-28 object-contain"
            />
          </div>
        </div>

        <div className="mt-4 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-md">
            <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
              <Calendar className="text-gray-600" size={22} />
            </div>

            <Link to={"/join_class"} className="flex-1">
              <div className="flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
                <NotebookPen className="text-gray-600" size={22} />
              </div>
            </Link>

            <Link to={"/message"}>
              <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
                <Bell
                  className="text-gray-600 hover:cursor-pointer"
                  size={22}
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <p className="mb-3 text-sm font-bold text-black">
              Today & Tomorrow
            </p>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            {!error && todayAndTomorrowSchedules.length === 0 && (
              <p className="text-sm font-medium text-gray-500 text-center">
                You do not have any class scheduled today or tomorrow
              </p>
            )}

            <div className="space-y-3">
              {todayAndTomorrowSchedules.map((schedule) => {
                const startDate = new Date(schedule.startTime);
                const endDate = new Date(schedule.endTime);

                return (
                  <div
                    key={schedule._id}
                    className="rounded-2xl bg-yellow-100 p-3"
                  >
                    <p className="text-sm font-bold text-black">
                      {schedule.class?.name || "Unknown class"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      By: {schedule.teacher?.name || "Unknown teacher"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {schedule.description || "Unknown description"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {startDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      ·{" "}
                      {startDate.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {endDate.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Room: {schedule.classroom || "No room"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <BottomNav Dashboard={true} />
    </>
  );
};

export default Dashboard;
