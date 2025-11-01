
import React from "react";
import { Home, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logo from "../images/Logo.png";
import logo2 from "../images/logo2.png";
import dash from "../images/Dashboard.png";
import Mesage from "../images/Message.png";
import qongiiroq from "../images/Qongiroq.png";
import settings from "../images/Setting.png";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[90px] h-screen bg-[#1F1D2B] flex flex-col items-center justify-between py-8 fixed left-0 top-0 shadow-lg shadow-[#00000040]">

      <div className="flex flex-col items-center gap-12">

        <div className="w-[55px] h-[55px] bg-[#252836] rounded-2xl flex items-center justify-center shadow-md shadow-[#EA7C6930] hover:shadow-[#EA7C69] transition-all duration-300 cursor-pointer">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>

        <div className="flex flex-col items-center gap-8 mt-2">

          <Link
            to="/"
            className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer  ${
              isActive("/") ? "bg-[#EA7C69]" : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <Home
              size={26}
              className={`transition-all duration-300 ${
                isActive("/") ? "text-white" : "text-gray-400"
              }`}
            />
          </Link>

          <Link
            to="/dashboard"
            className={`group mt-[40px] w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isActive("/dashboard")
                ? "bg-[#EA7C69]"
                : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <img
              src={logo2}
              alt="Dashboard"
              className={`w-6 h-6 object-contain transition-all duration-300 ${
                isActive("/dashboard")
                  ? "invert brightness-0 contrast-200"
                  : "invert-[0.6] group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              }`}
            />
          </Link>

          <Link
            to="/dashboard2"
            className={`group mt-[40px] w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isActive("/dashboard2")
                ? "bg-[#EA7C69]"
                : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <img
              src={dash}
              alt="Dashboard2"
              className={`w-6 h-6 object-contain transition-all duration-300 ${
                isActive("/dashboard2")
                  ? "invert brightness-0 contrast-200"
                  : "invert-[0.6] group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              }`}
            />
          </Link>

          <Link
            to="/message"
            className={`group mt-[40px] w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isActive("/message")
                ? "bg-[#EA7C69]"
                : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <img
              src={Mesage}
              alt="Message"
              className={`w-6 h-6 object-contain transition-all duration-300 ${
                isActive("/message")
                  ? "invert brightness-0 contrast-200"
                  : "invert-[0.6] group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              }`}
            />
          </Link>

          <Link
            to="/qongiroq"
            className={`group mt-[40px] w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isActive("/qongiroq")
                ? "bg-[#EA7C69]"
                : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <img
              src={qongiiroq}
              alt="Qongiroq"
              className={`w-6 h-6 object-contain transition-all duration-300 ${
                isActive("/qongiroq")
                  ? "invert brightness-0 contrast-200"
                  : "invert-[0.6] group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              }`}
            />
          </Link>

          <Link
            to="/settings"
            className={`group mt-[40px] w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
              isActive("/settings")
                ? "bg-[#EA7C69]"
                : "bg-[#252836] hover:bg-[#EA7C69]"
            }`}
          >
            <img
              src={settings}
              alt="Settings"
              className={`w-6 h-6 object-contain transition-all duration-300 ${
                isActive("/settings")
                  ? "invert brightness-0 contrast-200"
                  : "invert-[0.6] group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              }`}
            />
          </Link>
        </div>
      </div>

      <button
        className="group text-gray-400 hover:text-[#EA7C69] transition-all duration-300 hover:scale-110 mb-2"
        title="Logout"
      >
        <LogOut size={26} className="group-hover:text-[#EA7C69] transition-all" />
      </button>

    </div>
  );
}
