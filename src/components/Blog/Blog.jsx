import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

export default function Blog() {
  const data = useOutletContext();
  const posts = data.posts;
  const [selectedCategory, setSelectedCategory] = useState(null);

  // !==========================================================================

  const [search, setSearch] = useState("");

  const filteredCategory = (selectedCategory
    ? posts.filter((blog) => blog.category === selectedCategory)
    : posts).filter((blog)=> blog.title.includes(search));

  const clearFilter = () => {
    setSelectedCategory(null);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  // !=============================================================================

  const paginationPagesCount = Math.ceil(filteredCategory.length / 6);

  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPages = (index) => {
    setCurrentPage(index);
  };

  const lastIndex = currentPage * 6;
  const firstIndex = lastIndex - 6;

  const showenBlogs = filteredCategory.slice(firstIndex, lastIndex);

  // !============================================================================

  const [activeView, setActiveView] = useState("grid");

  return (
    <>
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label inline-flex items-center gap-2 mb-6">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            مدونتنا
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            استكشف <span className="gradient-text">مقالاتنا</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>
        </div>
      </div>
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في المقالات..."
                className="input-dark w-full px-5 py-3 pr-12"
                type="text"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
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
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === null ? "active-nav" : "unactive-nav"}`}
                onClick={clearFilter}
              >
                جميع المقالات
              </button>
              {data.categories.map((cat) => {
                return (
                  <button
                    onClick={() => {
                      handleCategory(cat.name);
                      setCurrentPage(1);
                    }}
                    key={cat.name}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === cat.name ? "active-nav" : "unactive-nav"}`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-[146px]">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-neutral-400">
            عرض{" "}
            <span className="font-bold text-white">
              {filteredCategory.length}
            </span>{" "}
            مقالات{" "}
            {selectedCategory && (
              <span>
                في{" "}
                <span className="font-bold text-orange-500 capitalize">
                  {selectedCategory}
                </span>
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">
              <button
                onClick={() => setActiveView("grid")}
                className={`p-2 rounded-lg transition-all duration-300 cursor-pointer  ${activeView == "grid" ? "active-view" : "text-neutral-400 hover:text-white"}`}
                title="عرض شبكي"
              >
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>

              <button
                onClick={() => setActiveView("list")}
                className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${activeView == "list" ? "active-view" : "text-neutral-400 hover:text-white"}`}
                title="عرض قائمة"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            activeView == "grid"
              ? `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
              : "flex flex-col gap-6"
          }
        >
          {showenBlogs.map((blog) => {
            return (
              <BlogCard key={blog.id} blog={blog} activeView={activeView} />
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-2 mt-12">
          {paginationPagesCount == 1 || (
            <Pagination
              currentPage={currentPage}
              PagesCount={paginationPagesCount}
              handleCurrentPages={handleCurrentPages}
            />
          )}
        </div>
      </div>
    </>
  );
}
