import React from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import RelatedBlogs from "./RelatedBlogs";

export default function BlogDetailes() {
  const { slug } = useParams();
  const data = useOutletContext();
  const blog = data.posts.find((blog) => blog.slug === slug);

  const relatedBlogs = data.posts.filter(
    (post) => post.category === blog.category && post.slug !== slug,
  ).slice(0, 3)

  const arabicDate = new Date(blog.date).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  //   ================================================================================

  const blocks = blog.content.split("\n\n");

  let intro = null;
  const sections = [];

  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i].trim();
    if (!block) {
      i++;
      continue;
    }

    if (block.startsWith("## ")) {
      const title = block.replace(/^##\s+/, "").trim();
      const body = (blocks[i + 1] || "").trim();
      sections.push({ title, body });
      i += 2;
    } else {
      if (!intro) intro = block;
      else sections.push({ title: null, body: block });
      i += 1;
    }
  }

  //   ====================================================================================

  return (
    <>
      <article className="bg-[#0a0a0a] min-h-screen">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
            src={blog.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 to-transparent">
            {" "}
          </div>
          <div className="absolute top-8 right-8 left-8">
            <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
              <Link
                className="text-white/70 hover:text-white transition-colors"
                to={"/"}
              >
                <i className="fa-solid fa-home"></i>
              </Link>
              <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
              <Link
                className="text-white/70 hover:text-white transition-colors"
                to={"/blog"}
              >
                المدونة
              </Link>
              <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
              <span className="text-orange-400 font-medium truncate max-w-[200px]">
                {blog.category}
              </span>
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
                  to={""}
                >
                  {blog.category}
                </Link>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar"></i>
                    {arabicDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-clock"></i>
                    {blog.readTime}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
                <img
                  alt={blog.author.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
                  src={blog.author.avatar}
                />
                <div>
                  <p className="font-bold text-white">{blog.author.name}</p>
                  <p className="text-sm text-white/60">{blog.author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <div className="order-2 lg:order-1">
              <div className="p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
                <p className="text-lg text-neutral-200 leading-relaxed italic">
                  {blog.excerpt}
                </p>
              </div>
              <div className="prose-custom">
                {intro && (
                  <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
                    {intro}
                  </p>
                )}

                {sections.map((sec, idx) => (
                  <div key={idx}>
                    {sec.title && (
                      <h2
                        id={`section-${idx}`}
                        className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24"
                      >
                        <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
                          <i className="fa-solid fa-camera text-orange-500"></i>
                        </span>
                        {sec.title}
                      </h2>
                    )}

                    {sec.body && (
                      <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
                        {sec.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <i className="fa-solid fa-tags text-orange-500"></i>
                  </div>
                  <h3 className="font-bold text-white">الوسوم</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => {
                    return (
                      <span
                        className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      <i className="fa-solid fa-share-nodes text-orange-500"></i>
                    </div>
                    <h3 className="font-bold text-white">شارك المقال</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#02141e] hover:text-white hover:border-transparent transition-all duration-300">
                      <i className="fa-brands fa-x-twitter" />
                    </button>
                    <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all duration-300">
                      <i className="fa-brands fa-linkedin-in" />
                    </button>
                    <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#25d366] hover:text-white hover:border-transparent transition-all duration-300">
                      <i className="fa-brands fa-whatsapp" />
                    </button>
                    <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all duration-300">
                      <i className="fa-solid fa-link" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-8 bg-gradient-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    alt={blog.author.name}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                    src={blog.author.avatar}
                  />
                  <div className="text-center sm:text-right flex-1">
                    <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                      كاتب المقال
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {blog.author.name}
                    </h3>
                    <p className="text-neutral-500 text-sm mb-3">
                      {blog.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <aside className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      <i className="fa-solid fa-list text-orange-500"></i>
                    </div>
                    <h3 className="font-bold text-white">محتويات المقال</h3>
                  </div>
                  <nav className="space-y-2">
                    {sections
                      .map((s, i) => ({ title: s.title, index: i }))
                      .filter((s) => s.title)
                      .map((s, idx) => (
                        <a
                          key={s.index}
                          href={`#section-${s.index}`}
                          className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                            {idx + 1}
                          </span>
                          <span className="text-sm">{s.title}</span>
                        </a>
                      ))}
                  </nav>
                </div>
                <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                      <i className="fa-regular fa-clock text-orange-500 text-xl mb-2"></i>
                      <p className="text-white font-bold">{blog.readTime}</p>
                      <p className="text-neutral-500 text-xs">وقت القراءة</p>
                    </div>
                    <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                      <i className="fa-regular fa-calendar text-orange-500 text-xl mb-2"></i>
                      <p className="text-white font-bold text-sm">
                        {arabicDate}
                      </p>
                      <p className="text-neutral-500 text-xs">تاريخ النشر</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-envelope text-orange-500 text-xl"></i>
                    </div>
                    <h3 className="font-bold text-white mb-2">
                      لا تفوّت جديدنا
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      اشترك للحصول على أحدث المقالات
                    </p>
                    <Link
                      className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center"
                      to={"/blog"}
                    >
                      تصفح المزيد
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="mt-20 pt-12 border-t border-[#262626]">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
                  <i className="fa-solid fa-images text-orange-500 text-xl"></i>
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    مقالات قد تعجبك
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    استكشف المزيد من المحتوى المميز
                  </p>
                </div>
              </div>
              <Link
                className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
                to={"/blog"}
              >
                عرض الكل{" "}
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((blog)=>{
                    return <RelatedBlogs key={blog.id} blog = {blog}/>
                })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
