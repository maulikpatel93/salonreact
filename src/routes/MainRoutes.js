import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../component/Loadable";
import AuthGuard from "./../utils/route-guard/AuthGuard";
import config from "./../config";

// dashboard routing
// const MainLayout = Loadable(lazy(() => import("../layout/MainLayout")));
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const Calendar = Loadable(lazy(() => import("../pages/calendar")));
const Sales = Loadable(lazy(() => import("../pages/sales")));
const Vouchers = Loadable(lazy(() => import("../pages/vouchers")));
const Subscriptions = Loadable(lazy(() => import("../pages/subscriptions")));
const Membership = Loadable(lazy(() => import("../pages/membership")));
const Clients = Loadable(lazy(() => import("../pages/clients")));
const Staff = Loadable(lazy(() => import("../pages/staff")));
const Services = Loadable(lazy(() => import("../pages/services")));
const Products = Loadable(lazy(() => import("../pages/products")));
const Reports = Loadable(lazy(() => import("../pages/reports")));
const Marketing = Loadable(lazy(() => import("../pages/marketing")));
const Account = Loadable(lazy(() => import("../pages/account")));
const NoMatch = Loadable(lazy(() => import("../pages/errors/NoMatch")));

const MainRoutes = {
  path: config.basePath + "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: config.basePath + "/dashboard",
      element: <Dashboard />,
    },
    {
      path: config.basePath + "/calendar",
      element: <Calendar />,
    },
    {
      path: config.basePath + "/sales",
      element: <Sales />,
    },
    {
      path: config.basePath + "/vouchers",
      element: <Vouchers />,
    },
    {
      path: config.basePath + "/subscriptions",
      element: <Subscriptions />,
    },
    {
      path: config.basePath + "/membership",
      element: <Membership />,
    },
    {
      path: config.basePath + "/clients",
      element: <Clients />,
    },
    {
      path: config.basePath + "/staff",
      element: <Staff />,
    },
    {
      path: config.basePath + "/services",
      element: <Services />,
    },
    {
      path: config.basePath + "/products",
      element: <Products />,
    },
    {
      path: config.basePath + "/reports",
      element: <Reports />,
    },
    {
      path: config.basePath + "/marketing",
      element: <Marketing />,
    },
    {
      path: config.basePath + "/account",
      element: <Account />,
    },
    { path: "*", element: <NoMatch /> },
  ],
};

export default MainRoutes;
