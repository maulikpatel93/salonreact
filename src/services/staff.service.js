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
    if (["working_hours"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "afterlogin/staff/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 5);
  formData.append("salon_id", auth.user.salon_id);
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
  const action = "afterlogin/staff/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 5);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const sort = values && values.sort;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  const result = values && values.result ? values.result : "";
  const dropdown = values && values.dropdown ? values.dropdown : "";
  const service_id = values && values.service_id ? values.service_id : "";

  let sortstring = "";
  if (sort) {
    let sortArray = [];
    let sortSubArray = [];
    Object.keys(sort).map(function (key, index) {
      if (Object.keys(sort[key]).length > 0) {
        Object.keys(sort[key]).map(function (subkey, subindex) {
          sortSubArray[subindex] = `sort[${key}][${subkey}]=${sort[key][subkey]}`;
        });
      }
      if (key != "supplier") {
        sortArray[index] = `sort[${key}]=${sort[key]}`;
      }
    });
    if (sortSubArray.length > 0) {
      let jsubsort = sortSubArray.join("&");
      sortstring = jsubsort;
    }
    if (sortArray.length > 0) {
      let jsort = sortArray.join("&");
      sortstring = jsort;
    }
  }
  const action = page ? `afterlogin/staff/view?page=${page}&${sortstring}` : `afterlogin/staff/view?${sortstring}`;
  let staffdata;
  if (dropdown) {
    staffdata = {
      auth_key: auth_key,
      action: action,
      salon_id: auth.user.salon_id,
      pagination: false, //true or false
      id: "",
      field: "first_name,last_name,email,profile_photo,phone_number", // first_name,last_name,email
      salon_field: false, //business_name,owner_name
      price_tier_field: "name", //business_name,owner_name
      result: result, //business_name,owner_name
      staff_working_hours_field: false,
      staff_service_field: false,
      roster_field: false,
    };
  } else {
    staffdata = {
      auth_key: auth_key,
      action: action,
      salon_id: auth.user.salon_id,
      pagination: values && values.id ? false : true, //true or false
      id: values && values.id ? values.id : "",
      field: values && values.id ? "" : "first_name,last_name,email,profile_photo,phone_number", // first_name,last_name,email
      salon_field: false, //business_name,owner_name
      price_tier_field: values && values.option ? "0" : "name", //business_name,owner_name
      staff_service_field: values && values.option ? "0" : "*", //business_name,owner_name
      staff_working_hours_field: values && values.option ? "0" : "*", //business_name,owner_name
      roster_field: values && values.option ? "0" : "*", //business_name,owner_name
      result: result, //business_name,owner_name
      option: values && values.option ? values.option : "",
      service_id: service_id
    };
  }
  const data = staffdata;
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/staff/delete/${values.id}`;
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
  const action = page ? `afterlogin/staff/view?page=${page}&q=${q}` : `afterlogin/staff/view?q=${q}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "first_name,last_name,email,profile_photo,phone_number", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
  };
  return axios.post(next_page_url ? `${next_page_url}&q=${q}` : API_URL + action, data, { headers: authHeader() });
};

const addonservices = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let staff_id = values && values.staff_id ? values.staff_id : "";
  const action = page ? `afterlogin/staff/addonservices?page=${page}&staff_id=${staff_id}` : `afterlogin/staff/addonservices?staff_id=${staff_id}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
  };
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};

const staffApiController = {
  create,
  update,
  view,
  deleted,
  suggetionlist,
  addonservices,
};
export default staffApiController;
