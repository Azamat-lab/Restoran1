import React from "react";
import logo2 from "../images/logo2.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-[#1C1C27] to-[#12121A] text-white min-h-screen p-6 ml-[90px]">
      <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold tracking-wide">📊 Dashboard</h1>
        <img
          src={logo2}
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600 hover:ring-blue-500 transition-all duration-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Orders", value: "124", color: "from-blue-500 to-purple-600" },
          { title: "Revenue", value: "$3,240", color: "from-green-500 to-emerald-600" },
          { title: "Customers", value: "87", color: "from-yellow-500 to-orange-500" },
          { title: "Pending", value: "9", color: "from-red-500 to-pink-600" },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-[#2B2B3A] hover:bg-[#353545] transition-all duration-300 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1`}
          >
            <h2 className="text-lg font-medium mb-2 text-gray-300">{item.title}</h2>
            <p
              className={`text-4xl font-extrabold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#2B2B3A] rounded-2xl p-8 flex-1 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">📈 Activity Overview</h2>
          <button className="px-3 py-1 text-sm bg-[#1F1F2E] rounded-lg border border-gray-600 hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
            View Details
          </button>
        </div>
        <p className="text-gray-400 text-base italic">
          Grafik yoki jadval joyi — hozircha placeholder 📉
        </p>
        <div className="mt-6 w-full h-56 bg-[#1F1F2E] rounded-xl border border-dashed border-gray-600 flex items-center justify-center text-gray-500">
          Coming soon...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
