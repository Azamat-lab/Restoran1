

import React from "react";
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
import dumoloq from "../images/Circle.png";
import dish1 from "../images/dish1.png";
import dish2 from "../images/dish2.png";
import dish3 from "../images/dish3.png";

import eren from "../images/eren.png";
import reiner from "../images/reiner.png";
import levi from "../images/levi.png";
import historia from "../images/historia.png";
import hanji from "../images/hanji.png";

const Dashboard2 = () => {
  const stats = [
    { label: "Total Revenue", value: "$10,243.00", change: "+32.40%", up: true },
    { label: "Total Dish Ordered", value: "23,456", change: "-12.40%", up: false },
    { label: "Total Customer", value: "1,234", change: "+2.40%", up: true },
  ];

  const orders = [
    { name: "Eren Jaegar", menu: "Spicy seasoned seafood noodles", payment: "$125", status: "Completed", img: eren },
    { name: "Reiner Braunn", menu: "Salted Pasta with mushroom sauce", payment: "$145", status: "Preparing", img: reiner },
    { name: "Levi Ackerman", menu: "Beef dumpling in hot and sour soup", payment: "$105", status: "Pending", img: levi },
    { name: "Historia Reiss", menu: "Hot spicy fried rice with omelet", payment: "$45", status: "Completed", img: historia },
    { name: "Hanji Zoe", menu: "Hot spicy fried rice with omelet", payment: "$245", status: "Completed", img: hanji },
  ];

  const mostOrdered = [
    { name: "Spicy seasoned seafood noodles", orders: 200 },
    { name: "Salted pasta with mushroom sauce", orders: 120 },
    { name: "Beef dumpling in hot and sour soup", orders: 80 },
  ];

  return (
    <div className="bg-gradient-to-b from-[#141320] to-[#0E0D14] text-white min-h-screen p-8 flex gap-8 font-[Inter] transition-all duration-300">

      <div className="flex-1 bg-[#1C1C27]/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300">

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Tuesday, 2 Feb 2021</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#24283B]/80 p-5 rounded-2xl shadow-lg border border-transparent hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.up ? (
                  <ArrowUp size={16} className="text-green-400" />
                ) : (
                  <ArrowDown size={16} className="text-red-400" />
                )}
                <span className={`${stat.up ? "text-green-400" : "text-red-400"} text-sm font-medium`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1F1D2B]/90 p-6 rounded-2xl shadow-inner border border-white/10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">📋 Order Report</h2>
            <button className="flex items-center gap-2 bg-[#2B2F40] px-4 py-2 rounded-lg text-sm hover:bg-[#353955] transition">
              <Filter size={14} /> Filter
            </button>
          </div>

          <div className="space-y-3">
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 px-4 rounded-xl bg-[#242435] hover:bg-[#2C2C45] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <img src={order.img} alt={order.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{order.name}</p>
                    <p className="text-gray-400 text-xs">{order.menu}</p>
                  </div>
                </div>

                <p className="text-gray-200 font-medium">{order.payment}</p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "Preparing"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-80 flex flex-col gap-8">

        <div className="bg-[#1B2030]/80 p-6 rounded-2xl shadow-xl border border-white/10 hover:border-purple-400/20 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">🍜 Most Ordered</h2>
            <select className="bg-[#242B3D] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Today</option>
            </select>
          </div>

          <div className="space-y-4">
            {mostOrdered.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={i === 0 ? dish1 : i === 1 ? dish2 : dish3}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover ring-1 ring-white/10 hover:ring-purple-500/30 transition-all"
                />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.orders} dishes ordered</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400/10 transition-all duration-300">
            View All
          </button>
        </div>

        <div className="bg-[#1B2030]/80 p-6 rounded-2xl shadow-xl border border-white/10 hover:border-blue-400/20 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">📊 Most Type of Order</h2>
            <select className="bg-[#242B3D] rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Today</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-6">
            <img src={dumoloq} alt="Order chart" className="w-36 h-36 object-contain" />
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <span className="text-pink-400">●</span> Dine In — <span className="text-white">200</span>
              </p>
              <p>
                <span className="text-yellow-400">●</span> To Go — <span className="text-white">122</span>
              </p>
              <p>
                <span className="text-blue-400">●</span> Delivery — <span className="text-white">264</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
