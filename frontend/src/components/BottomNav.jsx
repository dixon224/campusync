import { Calendar, LayoutDashboard, Menu, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/UseAuth";
const BottomNav = ({ Dashboard, Schedule, Notifs, menu, Sent }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <main className="fixed bottom-0 left-0  pb-0 px-4 w-full">
      <div className="mb-1 w-full mx-auto max-w-sm md:max-w-md lg:max-w-xl">
        <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-md">
          <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
            {Dashboard ? (
              <div
                onClick={() =>
                  navigate(
                    user.role === "admin"
                      ? "/dashboard_admin"
                      : user.role === "teacher"
                        ? "/dashboard_teacher"
                        : "/dashboard",
                  )
                }
                className="flex flex-col gap-1 items-center bg-gray-200 rounded-xl p-2"
              >
                <LayoutDashboard className="text-gray-600" size={22} />
                <p className="text-sm text-gray-400">Dashboard</p>
              </div>
            ) : (
              <div
                onClick={() =>
                  navigate(
                    user.role === "admin"
                      ? "/dashboard_admin"
                      : user.role === "teacher"
                        ? "/dashboard_teacher"
                        : "/dashboard",
                  )
                }
                className="flex flex-col gap-1 items-center"
              >
                <LayoutDashboard className="text-gray-600" size={22} />
                <p className="text-sm text-gray-400">Dashboard</p>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
            {Schedule ? (
              <div
                className="flex flex-col gap-1 items-center bg-gray-200 rounded-xl p-2"
                onClick={() =>
                  navigate(
                    user.role === "admin" ? "/add_schedule" : "/schedule",
                  )
                }
              >
                <Calendar className="text-gray-600" size={22} />
                <p className="text-sm text-gray-400">Schedule</p>
              </div>
            ) : (
              <div
                className="flex flex-col gap-1 items-center"
                onClick={() =>
                  navigate(
                    user.role === "admin" ? "/add_schedule" : "/schedule",
                  )
                }
              >
                <Calendar className="text-gray-600" size={22} />
                <p className="text-sm text-gray-400">Schedule</p>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
            {Notifs ? (
              <div
                className="flex flex-col gap-1 items-center bg-gray-200 rounded-xl p-2"
                onClick={() => navigate(Sent ? "/message_sent" : "/message")}
              >
                <Mail className="text-gray-600 " size={22} />
                <p className="text-sm text-gray-400">Messages</p>
              </div>
            ) : (
              <div
                className="flex flex-col gap-1 items-center"
                onClick={() => navigate(Sent ? "/message_sent" : "/message")}
              >
                <Mail className="text-gray-600 " size={22} />
                <p className="text-sm text-gray-400">Messages</p>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center cursor-pointer hover:bg-gray-100 active:scale-95 transition rounded-xl p-2">
            {menu ? (
              <div
                className="flex flex-col gap-1 items-center bg-gray-200 rounded-xl p-2"
                onClick={() => navigate("/menu")}
              >
                <Menu className="text-gray-600 " size={22} />
                <p className="text-sm text-gray-400">Menu</p>
              </div>
            ) : (
              <div
                className="flex flex-col gap-1 items-center"
                onClick={() => navigate("/menu")}
              >
                <Menu className="text-gray-600 " size={22} />
                <p className="text-sm text-gray-400">Menu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BottomNav;
