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
import PaymentSuccess from "../Pages/Pricing/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/Pricing/PaymentCancel/PaymentCancel";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageLessons from "../Pages/Dashboard/Admin/ManageLessons/ManageLessons";
import ReportedLessons from "../Pages/Dashboard/Admin/ReportedLessons/ReportedLessons";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import NotFound from "../Components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    // errorElement: NotFound,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
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
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancel",
        element: <PaymentCancel />,
      },
    ],
  },

  {
    path: "/dashboard",
    // errorElement: NotFound,
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
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
        path: "/dashboard/admin",
        Component: AdminHome,
      },
      {
        path: "/dashboard/admin/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/admin/manage-lessons",
        Component: ManageLessons,
      },
      {
        path: "/dashboard/admin/reported-lessons",
        Component: ReportedLessons,
      },
      {
        path: "/dashboard/admin/profile",
        Component: AdminProfile,
      },
    ],
  },
]);

export default router;
