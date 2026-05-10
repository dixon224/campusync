import { useEffect, useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import http from "../api/http";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await http.get("/messages/inbox");
        setMessages(res.data.messages);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading messages");
        setMessages([]);
      }
    }

    getMessages();
  }, []);

  return (
    <>
      <Header title="Messages" showCard={true} />

      <main className="min-h-screen bg-yellow-300 pt-24 pb-28 px-4">
        <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-xl space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {!error && messages.length === 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-md text-center">
              <p className="text-sm font-medium text-gray-500">
                You do not have any message yet
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message._id}
              className="rounded-3xl bg-white p-5 shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-black">
                    {message.sender?.name || "Unknown sender"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {message.sender?.role || "Unknown role"}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(message.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>

              <p className="mt-4 whitespace-pre-line text-sm text-gray-600">
                {message.msg}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </>
  );
};

export default Messages;
