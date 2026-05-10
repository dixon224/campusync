import { useEffect, useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import http from "../api/http";
import useAuth from "../context/UseAuth";

function SendMessage() {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [recipients, setRecipients] = useState([]);
  const [msg, setMsg] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        if (user?.role === "admin") {
          const teachersRes = await http.get("/auth/teachers");
          const studentsRes = await http.get("/auth/students");

          setTeachers(teachersRes.data.teachers);
          setStudents(studentsRes.data.students);
        }

        if (user?.role === "teacher") {
          const studentsRes = await http.get("/auth/students");
          setStudents(studentsRes.data.students);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error loading users");
      }
    }

    loadUsers();
  }, [user]);

  function handleRecipientChange(id) {
    if (recipients.includes(id)) {
      setRecipients(recipients.filter((recipientId) => recipientId !== id));
    } else {
      setRecipients([...recipients, id]);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (recipients.length === 0) {
      setError("Please select at least one recipient");
      return;
    }

    if (!msg.trim()) {
      setError("Please write a message");
      return;
    }

    try {
      const res = await http.post("/messages", {
        recipients,
        msg,
      });

      setSuccess(res.data?.message || "Message sent successfully");
      setRecipients([]);
      setMsg("");
    } catch (err) {
      setError(err.response?.data?.message || "Message sending error");
    }
  }

  return (
    <>
      <Header title="Send Message" showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 pb-28 px-4">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl rounded-3xl bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-black text-center">
            Send a message
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            Select recipients and write your message.
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="mt-6 space-y-5">
            {user?.role === "admin" && teachers.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-bold text-black">Teachers</p>

                <div className="space-y-2">
                  {teachers.map((teacher) => (
                    <label
                      key={teacher._id}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={recipients.includes(teacher._id)}
                        onChange={() => handleRecipientChange(teacher._id)}
                      />

                      <span>
                        {teacher.name} - {teacher.email}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-bold text-black">Students</p>

              <div className="max-h-60 space-y-2 overflow-y-auto">
                {students.map((student) => (
                  <label
                    key={student._id}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={recipients.includes(student._id)}
                      onChange={() => handleRecipientChange(student._id)}
                    />

                    <span>
                      {student.name} - {student.email}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write your message..."
              rows="5"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-500 active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        </div>
      </main>

      <BottomNav />
    </>
  );
}

export default SendMessage;
