import Header from "../components/Header";
import { Calendar, Bell } from "lucide-react";
import BottomNav from "../components/BottomNav";
import useAuth from "../context/UseAuth";
import { Link } from "react-router-dom";
const DashboardTeacher = () => {
  const { user } = useAuth();
  return (
    <>
      <Header title="Dashboard" showTrash={false} showCard={true} />

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
              <Bell className="text-gray-600 hover:cursor-pointer" size={22} />
            </div>
          </div>
        </div>

        <div className="mt-4 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
          <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-md">
            <p className="mt-1 text-sm font-medium text-gray-500 text-center max-w-xs mx-auto">
              You do not have any class scheduled today or tomorrow
            </p>
          </div>
        </div>
      </main>
      <BottomNav Dashboard={true} />
    </>
  );
};

export default DashboardTeacher;
