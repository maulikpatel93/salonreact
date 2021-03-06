import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const moduleview = () => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const role_id = auth.user.role_id;
  const salon_id = auth.user.salon_id;
  const action = `afterlogin/salonmodule/view?role_id=${role_id}&salon_id=${salon_id}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_permission_field: 0,
    type: "Menu",
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const accessview = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const auth_role_id = auth.user.role_id;
  const role_id = values && values.type && values.type === "staff_access" && auth_role_id === 4 ? 5 : auth_role_id;
  const salon_id = auth.user.salon_id;
  const action = `afterlogin/salonmodule/view?role_id=${role_id}&salon_id=${salon_id}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_permission_field: "*",
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  const action = "afterlogin/salonmodule/accessupdate";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 5);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const salonmoduleApiController = {
  moduleview,
  accessview,
  update,
};
export default salonmoduleApiController;
