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
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import Pricing from "../Pages/Pricing/Pricing";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import MyFavorites from "../Pages/Dashboard/MyFavorites/MyFavorites";
import Profile from "../Pages/Dashboard/MyProfile/Profile";

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
      {
        path: "/pricing",
        Component: Pricing,
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
        path: "/dashboard",
        Component: DashboardHome,
      },
      {
        path: "/dashboard/add-lesson",
        Component: AddLesson,
      },
      {
        path: "/dashboard/my-lessons",
        Component: MyLessons,
      },
      {
        path: "/dashboard/my-favorites",
        Component: MyFavorites,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },

      // Admin.......
      {
        path: "/dashboard/admin/manage-users",
        Component: ManageUsers,
      },
    ],
  },
]);

export default router;
