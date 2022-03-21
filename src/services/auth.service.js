import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password, remember_me) => {
  return axios.post(API_URL + "login", {
    action: "login",
    email,
    password,
    remember_me,
  });
};

const logout = () => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  return axios.post(
    API_URL + "afterlogin/logout",
    {
      action: "logout",
      auth_key,
    },
    { headers: authHeader() },
  );
};

const getUser = (authenticate) => {
  const token = authenticate.token;
  const auth_key = authenticate.auth_key;
  const action = "afterlogin/user";
  return axios.post(
    API_URL + action,
    {
      action: "afterlogin/user",
      auth_key,
    },
    { headers: authHeader({ token: token }) },
  );
};

const forgotpassowrdsubmit = (values) => {
  const action = "beforelogin/forgotpassword";
  return axios.post(API_URL + action, {
    action: "afterlogin/forgotpassword",
    email: values.email,
  });
};

const authService = {
  register,
  login,
  logout,
  getUser,
  forgotpassowrdsubmit,
};
export default authService;
