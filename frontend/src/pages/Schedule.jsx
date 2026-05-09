//import { CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import http from "../api/http";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  const formatSchedules = (schedules) => {
    const grouped = {};

    schedules.forEach((schedule) => {
      const startDate = new Date(schedule.startTime);
      const endDate = new Date(schedule.endTime);

      const key = startDate.toDateString();

      const day = startDate.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const date = startDate.toLocaleDateString("en-US", {
        day: "2-digit",
      });

      if (!grouped[key]) {
        grouped[key] = {
          day,
          date,
          classes: [],
        };
      }

      grouped[key].classes.push({
        start: startDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end: endDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        title: schedule.description || schedule.class?.name || "No title",
        room: schedule.classroom || "No room",
      });
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    async function getClasses() {
      try {
        const res = await http.get("auth/my_schedules");
        setSchedules(res.data.schedules);
      } catch (err) {
        setError(err.response?.data?.message || "An error has occurred");
        setSchedules([]);
      }
    }

    getClasses();
  }, []);

  const events = formatSchedules(schedules);

  return (
    <>
      <Header title="March 2026" showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 pb-28 px-4">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl space-y-5">
          {error && (
            <p className="rounded-xl bg-red-100 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {events.length === 0 && !error && (
            <p className="rounded-xl bg-white p-4 text-center text-sm text-gray-500">
              No schedules found
            </p>
          )}

          {events.map((event, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-12 text-center text-black">
                <p className="text-sm font-medium">{event.day}</p>
                <p className="text-2xl font-semibold leading-6">{event.date}</p>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {event.classes.map((classe, ind) => (
                  <div
                    key={ind}
                    className="relative flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-md"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 text-sm text-gray-400">
                        <p>{classe.start}</p>
                        <p className="mt-2">{classe.end}</p>
                      </div>

                      <div className="flex-1">
                        <p className="line-clamp-2 text-sm font-bold text-black">
                          {classe.title}
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm text-gray-500">
                          {classe.room}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav Schedule={true} />
    </>
  );
};

export default Schedule;
