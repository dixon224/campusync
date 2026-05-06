import { useNavigate } from "react-router-dom";
import useAuth from "../context/UseAuth";

const Card = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-yellow-300 text-white">
      {/* HEADER */}
      <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">
          {user && user.role === "student" ? "Student Card" : "Teacher Card"}
        </h1>

        <button onClick={() => navigate(-1)} className="text-black font-medium">
          Back
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl">
        {/* CARD BLOCK */}
        <div className="rounded-3xl bg-white text-black p-5 mt-10">
          {/* PHOTO */}
          <div className="flex justify-center">
            <img
              src={user?.profileImage?.url || "/photo.png"}
              alt={user?.name || "user"}
              className="w-100 h-60 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
          </div>

          {/* NAME */}
          <p className="mt-4 text-center text-lg font-semibold">
            {user ? user.name : "Not connected"}
          </p>
        </div>

        {/* ACADEMIC YEAR */}
        <div className="mt-4 rounded-2xl bg-white p-4 text-black">
          <p className="text-sm text-black">Academic year</p>
          <p className="mt-1 text-lg font-semibold">2025/2026</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
