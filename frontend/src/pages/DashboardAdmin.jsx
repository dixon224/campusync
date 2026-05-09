import Header from "../components/Header";
import { Calendar, Bell, NotebookPen, UserPlus } from "lucide-react";
import BottomNav from "../components/BottomNav";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  return (
    <>
      <Header title="Dashboard" showCard={false} />

      <main className="min-h-screen bg-yellow-300 pt-24 px-4 ">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl rounded-3xl bg-white p-5 shadow-md flex items-center justify-between">
          {/* LEFT : Infos */}
          <div className="flex-1 pr-4">
            <p className="text-lg font-bold text-black">
              {user ? user.name : "Not Connected"}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-500 max-w-xs">
              {user ? user.role : "Not Connected"}
            </p>

            <p className="mt-2 text-sm text-gray-400">2025/2026</p>
          </div>

          {/* RIGHT : Logo */}
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
            <Link to={"/add_schedule"}>
              <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
                <Calendar className="text-gray-600" size={22} />
              </div>
            </Link>

            <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
              <Link to={"/class"}>
                <NotebookPen className="text-gray-600" size={22} />
              </Link>
            </div>

            <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
              <Link to={"/signup"}>
                {" "}
                <UserPlus className="text-gray-600" size={22} />
              </Link>
            </div>

            <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
              <Bell className="text-gray-600 hover:cursor-pointer" size={22} />
            </div>
          </div>
        </div>

        <div className="mt-4 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-black">
                  Campus activity
                </h2>
              </div>

              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-500">
                {formattedDate}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-yellow-100 p-4">
                <p className="text-2xl font-bold text-black">120</p>
                <p className="mt-1 text-xs text-gray-600">Students</p>
              </div>

              <div className="rounded-2xl bg-sky-100 p-4">
                <p className="text-2xl font-bold text-black">32</p>
                <p className="mt-1 text-xs text-gray-600">Classes</p>
              </div>

              <div className="rounded-2xl bg-purple-100 p-4">
                <p className="text-2xl font-bold text-black">5</p>
                <p className="mt-1 text-xs text-gray-600">Notifications</p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <p className="text-2xl font-bold text-black">8</p>
                <p className="mt-1 text-xs text-gray-600">Free Rooms</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav Dashboard={true} />
    </>
  );
};

export default DashboardAdmin;
