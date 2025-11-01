import React from "react";
import { Bell, Trash2 } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

const Qongiroq = () => {
  const { notifications, clearNotifications, removeNotification } = useNotifications();

  return (
    <div className="p-6 min-h-screen bg-[#252836] flex flex-col items-center">

      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-[#EA7C69]" size={28} />
        <h2 className="text-2xl font-bold text-white">Zakazlar</h2>
      </div>

      <div className="w-full max-w-md bg-[#252836] rounded-xl shadow-md p-4 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-center">Hozircha zakaz yoʻq 😊</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex justify-between items-start gap-4 border-b border-gray-700 pb-3 last:border-none"
            >
              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">{n.name}</h3>
                <p className="text-gray-400 text-sm truncate">{n.message}</p>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeNotification(n.id)}
                  className="text-red-400 hover:text-red-300"
                  title="O'chirish"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <button
          onClick={clearNotifications}
          className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Barchasini oʻchirish
        </button>
      )}
    </div>
  );
};

export default Qongiroq;
