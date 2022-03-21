import { lazy } from "react";

// project imports
import Loadable from "../component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import GuestGuard from "./../utils/route-guard/GuestGuard";
import config from "./../config";
// login option 3 routing
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Signup = Loadable(lazy(() => import("../pages/Signup")));
const NoMatch = Loadable(lazy(() => import("../pages/errors/NoMatch")));
const ForgotPassword = Loadable(lazy(() => import("../pages/auth/ForgotPassword")));

// import { useSelector } from "react-redux";
// const { isLoggedIn } = useSelector((state) => state.auth);

const AuthenticationRoutes = {
  path: config.basePath + "/",
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [
    { path: config.basePath + "/login", element: <Login /> },
    { path: config.basePath + "/signup", element: <Signup /> },
    { path: config.basePath + "/forgotpassowrd", element: <ForgotPassword /> },
    { path: "*", element: <NoMatch /> },
  ],
};

export default AuthenticationRoutes;
