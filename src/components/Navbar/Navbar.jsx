import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [menu, setmenu] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <NavLink to="/" className="flex gap-4 ">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                <img src={logo} alt="logo" className="w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">عدسة</span>
                <span className=" text-xs text-orange-400/80">
                  عالم التصوير الفوتوغرافي
                </span>
                <div></div>
              </div>
            </NavLink>

            <div className="hidden md:flex items-center links">
              <div className="flex items-center bg-[#161616] rounded-full p-1.5 border border-[#262626]">
                <NavLink
                  to="/"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white "
                >
                  الرئيسية
                </NavLink>
                <NavLink
                  to="/blog"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white "
                >
                  المدونة
                </NavLink>
                <NavLink
                  to="/about_us"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white "
                >
                  من نحن
                </NavLink>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="p-3 text-neutral-500 hover:text-orange-500 hover:bg-[#161616] rounded-xl transition-all duration-300 border border-transparent hover:border-[#262626]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <NavLink
                className="font-bold text-sm text-white px-8 py-4 rounded-4xl bg-amber-700 bg-linear-to-r from-orange-500 to-orange-600 hover:-translate-y-0.5 transition-transform delay-150"
                to="/blog"
              >
                ابدأ القراءة
              </NavLink>
            </div>
            <button
              onClick={() => setmenu(!menu)}
              className="md:hidden p-3 text-neutral-400 hover:text-white hover:bg-[#161616] rounded-xl transition-all duration-300 border border-transparent hover:border-[#262626]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${menu ? "max-h-80 pb-6" : " max-h-0"}`}
          >
            <div className="bg-[#161616] backdrop-blur-xl rounded-2xl p-4 border border-[#262626]">
              <div className="flex flex-col space-y-1 menu">
                <NavLink
                  onClick={()=>setmenu(false)}
                  className={
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-[#1a1a1a] hover:text-white"
                  }
                  to={"/"}
                >
                  الرئيسية
                </NavLink>
                <NavLink
                  onClick={()=>setmenu(false)}
                  className={
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-[#1a1a1a] hover:text-white"
                  }
                  to={"/blog"}
                >
                  المدونة
                </NavLink>
                <NavLink
                  onClick={()=>setmenu(false)}
                  className={
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-[#1a1a1a] hover:text-white"
                  }
                  to={"/about_us"}
                >
                  من نحن
                </NavLink>
                <Link onClick={()=>setmenu(false)} className="btn text-sm text-center mt-2 bg-[linear-gradient(135deg,rgb(249,115,22),rgb(234,88,12))]" to={"/blog"}>
                  ابدأ القراءة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
