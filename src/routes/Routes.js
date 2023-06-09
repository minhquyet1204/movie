import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../Layout/Layout";
import Home from "../pages/Home";

import Catalog from "../pages/catalog/Catalog";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Detail from "../pages/detail/Detail";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Favorite from "../pages/favorite/Favorite";
const Routes = ({ chidlren }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        { path: ":cate", element: <Catalog /> },
        { path: ":cate/search/:keyword", element: <Catalog /> },

        {
          path: "/:cate/:id",
          element: <Detail />,
        },

        { path: "/favorite", element: <Favorite /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);
  return <RouterProvider router={router}>{chidlren}</RouterProvider>;
};

export default Routes;
