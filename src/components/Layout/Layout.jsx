import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import data from "../../data/posts.json";

export default function Layout() {

  return (
    <>
      <Navbar />
      <main className="pt-20 -z-10">
        <Outlet  context={data} />
      </main>
      <Footer />
      <ScrollRestoration/>
    </>
  );
}
