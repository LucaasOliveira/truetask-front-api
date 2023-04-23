import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import TaskList from "../pages/TaskList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: "/task-list",
    element: <TaskList />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
