import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const create = (values) => {
  // const auth = store.getState().auth;
  // const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    if (["working_hours"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "beforelogin/salons/store";
  formData.append("action", action);
  formData.append("business_email", values && values["email"]);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    if (["working_hours"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "afterlogin/categories/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 6);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const checkexist = (values) => {
  // const auth = store.getState().auth;
  // const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    if (["working_hours"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "beforelogin/salons/checkexist";
  formData.append("action", action);
  formData.append("business_email", values && values["email"]);
  formData.append("pagetype", values && values["pagetype"]);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const signupApiController = {
  create,
  update,
  checkexist,
};
export default signupApiController;
