import { IdCard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/UseAuth";
import http from "../api/http";
const Header = ({ title, showCard }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  async function handleLogout() {
    try {
      await http.post("/auth/logout");

      setUser(null);

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-300 h-13 flex items-center justify-between px-4 border-b-2 border-white focus:outline-none">
      {/* LEFT */}
      <div className="w-10 flex justify-start">
        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer active:scale-95 transition"
        >
          <LogOut size={18} className="text-red-400" />
        </button>
      </div>

      {/* CENTER (contenu centré mobile) */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-sm w-full flex justify-center">
          <h1 className="text-lg font-bold text-black text-center">{title}</h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-10 flex justify-end">
        {showCard && (
          <div
            onClick={() => navigate("/card")}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer active:scale-95 transition"
          >
            <IdCard size={18} className="text-sky-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
