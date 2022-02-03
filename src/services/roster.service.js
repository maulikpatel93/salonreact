import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const create = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  const action = "afterlogin/roster/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const update = (values) => {
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
  const action = "afterlogin/roster/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 6);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;

  const action = `afterlogin/staff/view`;

  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: false, //true or false
    id: values && values.id ? values.id : "",
    field: "first_name,last_name,email,profile_photo,phone_number", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    price_tier_field: "name", //business_name,owner_name
    staff_working_hours_field: false,
    staff_service_field: false,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/roster/delete/${values.id}`;
  const data = {
    auth_key: auth_key,
    action: action,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const suggetionlist = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let q = values && values.q ? values.q : "";
  const action = page ? `afterlogin/roster/view?page=${page}&q=${q}` : `afterlogin/roster/view?q=${q}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "name", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
  };
  return axios.post(next_page_url ? `${next_page_url}&q=${q}` : API_URL + action, data, { headers: authHeader() });
};

const rosterApiController = {
  create,
  update,
  view,
  deleted,
  suggetionlist,
};
export default rosterApiController;
