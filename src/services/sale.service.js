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
  const action = "afterlogin/sale/store";
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
  const action = "afterlogin/sale/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 6);
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
  let sortstring = "";
  if (sort) {
    let sortArray = [];
    Object.keys(sort).map(function (key, index) {
      return (sortArray[index] = `sort[${key}]=${sort[key]}`);
    });
    if (sortArray.length > 0) {
      let jsort = sortArray.join("&");
      sortstring = jsort;
    }
  }
  const pagination = values && values.option ? false : true;
  const action = page ? `afterlogin/sale/view?page=${page}&${sortstring}` : `afterlogin/sale/view?${sortstring}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: values && values.id ? false : pagination, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "name", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    result: result, //business_name,owner_name
    option: values && values.option ? values.option : "",
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/sale/delete/${values.id}`;
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
  const action = page ? `afterlogin/sale/view?page=${page}&q=${q}` : `afterlogin/sale/view?q=${q}`;
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

const services = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let service_id = values && values.service_id ? values.service_id : "";
  let q = values && values.q ? values.q : "";
  const action = page ? `afterlogin/sale/services?page=${page}&service_id=${service_id}&q=${q}` : `afterlogin/sale/services?service_id=${service_id}&q=${q}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
  };
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};

const products = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let product_id = values && values.product_id ? values.product_id : "";
  let q = values && values.q ? values.q : "";
  const action = page ? `afterlogin/sale/products?page=${page}&product_id=${product_id}&q=${q}` : `afterlogin/sale/products?product_id=${product_id}&q=${q}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
  };
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};

const saleApiController = {
  create,
  update,
  view,
  deleted,
  suggetionlist,
  services,
  products,
};
export default saleApiController;
