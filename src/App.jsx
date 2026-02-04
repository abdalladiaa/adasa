import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import About_us from "./components/About us/About_us";
import Blog from "./components/Blog/Blog";
import Notfound from "./components/Notfound/Notfound";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import BlogDetailes from "./components/Blog/BlogDetailes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/about_us",
          element: <About_us />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/blog/:slug",
          element: <BlogDetailes />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
