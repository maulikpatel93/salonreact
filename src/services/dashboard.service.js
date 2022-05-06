import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const upcomingappointment = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;

  const action = `afterlogin/dashboard/upcomingappointment`;

  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};
const dashboardview = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;

  const action = `afterlogin/dashboard/view`;

  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const dashboardApiController = {
  upcomingappointment,
  dashboardview,
};

export default dashboardApiController;
