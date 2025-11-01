import React from "react";
import { useMessages } from "../context/MessageContext";

const Message = () => {
  const { messages, clearMessages } = useMessages();

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-[#252836]">
      <h2 className="text-2xl font-bold mb-4">📩 Yuborilgan Izohlar</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">Hozircha izoh yo‘q.</p>
      ) : (
        <ul className="w-full max-w-md bg-[#2D303E] rounded-lg shadow p-4 space-y-3">
          {messages.map((msg, index) => (
            <li
              key={index}
              className="border-b pb-2 text-white-700 last:border-none"
            >
              {msg}
            </li>
          ))}
        </ul>
      )}

      {messages.length > 0 && (
        <button
          onClick={clearMessages}
          className="mt-6 bg-[#EA7C69] text-white py-2 px-6 rounded-lg hover:bg-red-600"
        >
          O‘chirish
        </button>
      )}
    </div>
  );
};

export default Message;
