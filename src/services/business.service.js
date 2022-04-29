import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value] === null ? "" : values[value]);
  }
  const action = "afterlogin/businessupdate/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};
const timezone = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  // for (let value in values) {
  //   formData.append(value, values[value] === null ? "" : values[value]);
  // }
  const action = "afterlogin/timezone";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const businessApiController = {
  update,
  timezone,
};

export default businessApiController;
