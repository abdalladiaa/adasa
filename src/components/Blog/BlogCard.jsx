import React from "react";
import { Link } from "react-router-dom";
import GridView from "./GridView";
import ListView from "./ListView";

export default function BlogCard({ blog, activeView }) {
  return <>{activeView == "grid" ? <GridView blog = {blog} /> : <ListView blog = {blog} />}</>;
}
