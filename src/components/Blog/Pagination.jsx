import React from "react";

export default function Pagination({
  currentPage,
  PagesCount,
  handleCurrentPages,
}) {
  return (
    <>
      <button
        disabled={currentPage === 1}
        onClick={() => handleCurrentPages(currentPage - 1)}
        className={`p-3 rounded-xl border transition-all duration-300
    ${
      currentPage === 1
        ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
        : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]"
    }
  `}
      >
        <svg
          className="w-5 h-5 rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: PagesCount }, (_, i) => (
          <button
            key={i}
            className={`min-w-[44px] h-11 rounded-xl text-sm font-medium transition-all duration-300 bg-[#161616]  border border-[#262626] hover:border-orange-500/50 hover:text-white ${currentPage == i + 1 ? "active-pagination" : "text-neutral-400"} `}
            onClick={() => handleCurrentPages(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        disabled={currentPage === PagesCount}
        onClick={() => handleCurrentPages(currentPage + 1)}
        className={`p-3 rounded-xl border transition-all duration-300
    ${
      currentPage === PagesCount
        ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
        : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a] cursor-pointer"
    }
  `}
      >
        <svg
          className="w-5 h-5 rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  );
}
