import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PublicLessons from "../Pages/PublicLessons/PublicLessons";
import LessonsDetails from "../Pages/PublicLessons/LessonsDetails";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "public-lessons",
        Component: PublicLessons,
      },
      {
        path: "/lessons/:id",
        element: (
          <PrivateRouter>
            <LessonsDetails />
          </PrivateRouter>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: '/dashboard',
        Component: DashboardHome,
      },
    ],
  },
]);

export default router;
