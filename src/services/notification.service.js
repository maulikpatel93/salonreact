import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const notificationview = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;

  const action = `afterlogin/notification/view`;

  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const notificationApiController = {
  notificationview,
};

export default notificationApiController;
