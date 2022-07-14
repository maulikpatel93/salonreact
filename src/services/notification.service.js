import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const notifylistview = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;

  const action = `afterlogin/notifydetail/view`;

  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: false, //true or false
    notifydata:values.notifydata
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const notifyupdate = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    if (["gender"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, values[value].value);
    } else {
      formData.append(value, values[value]);
    }
  }
  console.log(values);
  const action = values.id ? "afterlogin/notifydetail/update/" + values.id : "afterlogin/notifydetail/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const notificationApiController = {
  notifylistview,
  notifyupdate,
};

export default notificationApiController;
