import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import Layout from "../Layout/Layout";
import Home from "../pages/Home";

import Catalog from "../pages/catalog/Catalog";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Detail from "../pages/detail/Detail";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
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
          element: (
            // <ProtectedRoute>
            // </ProtectedRoute>
            <Detail />
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);
  return <RouterProvider router={router}>{chidlren}</RouterProvider>;
};

export const ProtectedRoute = ({ chidlren }) => {
  let currentUser = null;
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return chidlren;
};

export default Routes;
