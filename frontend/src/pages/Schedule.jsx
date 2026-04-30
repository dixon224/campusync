//import { CalendarDays } from "lucide-react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

const Schedule = () => {
  const events = [
    {
      day: "Wed",
      date: "25",
      classes: [
        {
          start: "08:00",
          end: "10:00",
          title: "Database class",
          room: "i-cell 301",
        },
        {
          start: "10:15",
          end: "12:00",
          title: "Embedded Systems",
          room: "S401",
        },
        {
          start: "13:00",
          end: "14:20",
          title: "Algo Prog",
          room: "I-cell 402",
        },
      ],
    },
    {
      day: "Thu",
      date: "26",
      classes: [
        {
          start: "07:00",
          end: "08:20",
          title: "Algo Prog",
          room: "I-cell 405",
        },
        {
          start: "13:00",
          end: "14:20",
          title: "Algo Prog",
          room: "I-cell 402",
        },
      ],
    },
    {
      day: "Fri",
      date: "27",
      classes: [
        {
          start: "13:00",
          end: "14:00",
          title: "Meeting",
          room: "Don't know",
        },
      ],
    },
  ];

  return (
    <>
      <Header title="March 2026" showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 pb-28 px-4">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl space-y-5">
          {events.map((event, index) => (
            <div key={index} className="flex gap-3">
              {/* Date à gauche */}
              <div className="w-12 text-center text-black">
                <p className="text-sm font-medium">{event.day}</p>
                <p className="text-2xl font-semibold leading-6">{event.date}</p>
              </div>

              {/* Carte événement */}

              <div className="flex flex-1 flex-col gap-2">
                {event.classes.map((classe, ind) => (
                  <div
                    key={ind}
                    className="relative flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-md"
                  >
                    <div className="flex gap-4">
                      {/* Heure */}
                      <div className="w-16 text-sm text-gray-400">
                        <p>{classe.start}</p>
                        <p className="mt-2">{classe.end}</p>
                      </div>

                      {/* Infos */}
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
