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
    if (["service_price"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "afterlogin/services/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("role_id", 6);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    if (["service_price"].includes(value) && values[value] && typeof values[value] === "object") {
      formData.append(value, JSON.stringify(values[value]));
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "afterlogin/services/update/" + values.id;
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
  const dropdown = values && values.dropdown ? values.dropdown : "";
  const result = values && values.result ? values.result : "";
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
      if (key != "category") {
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
  const action = page ? `afterlogin/services/view?page=${page}&${sortstring}` : `afterlogin/services/view?${sortstring}`;
  let servicedata;
  if (dropdown) {
    servicedata = {
      auth_key: auth_key,
      action: action,
      salon_id: auth.user.salon_id,
      pagination: false, //true or false
      id: "",
      field: "name,description,duration,padding_time,color,service_booked_online,deposit_booked_online,deposit_booked_price", // first_name,last_name,email
      salon_field: false, //business_name,owner_name
      result: result, //business_name,owner_name
    };
  } else {
    servicedata = {
      auth_key: auth_key,
      action: action,
      salon_id: auth.user.salon_id,
      pagination: values && values.id ? false : true, //true or false
      id: values && values.id ? values.id : "",
      field: values && values.id ? "" : "name,description,duration,padding_time,color,service_booked_online,deposit_booked_online,deposit_booked_price", // first_name,last_name,email
      salon_field: false, //business_name,owner_name
      serviceprice_field: values && values.option ? "0" : "price_tier_id,price,add_on_price", //business_name,owner_name
      supplier_field: values && values.option ? "0" : "name", //business_name,owner_name
      tax_field: values && values.option ? "0" : "name", //business_name,owner_name
      addOnService_field: values && values.option ? "0" : "name", //business_name,owner_name
      addOnStaff_field: values && values.option ? "0" : "name", //business_name,owner_name
      category_field: values && values.option ? "0" : "name", //business_name,owner_name
      result: result, //business_name,owner_name
      option: values && values.option ? values.option : "",
      category_id: values && values.category_id ? values.category_id : "",
    };
  }

  const data = servicedata;
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/services/delete/${values.id}`;
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
  const action = page ? `afterlogin/services/view?page=${page}&q=${q}` : `afterlogin/services/view?q=${q}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: true, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "name,description,duration,padding_time,color,service_booked_online,deposit_booked_online,deposit_booked_price", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
  };
  return axios.post(next_page_url ? `${next_page_url}&q=${q}` : API_URL + action, data, { headers: authHeader() });
};

const addonservices = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let isNotId = values && values.isNotId ? values.isNotId : "";
  const action = page ? `afterlogin/services/addonservices?page=${page}&isNotId=${isNotId}` : `afterlogin/services/addonservices?isNotId=${isNotId}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
  };
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};

const addonstaff = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  let service_id = values && values.service_id ? values.service_id : "";
  const action = page ? `afterlogin/services/addonstaff?page=${page}&service_id=${service_id}` : `afterlogin/services/addonstaff?service_id=${service_id}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
  };
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};

const serviceprice = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  let service_id = values && values.service_id ? values.service_id : "";
  let staff_id = values && values.service_id ? values.staff_id : "";
  const action = `afterlogin/services/serviceprice`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    service_id: service_id,
    staff_id: staff_id,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const serviceApiController = {
  create,
  update,
  view,
  deleted,
  suggetionlist,
  addonservices,
  addonstaff,
  serviceprice,
};
export default serviceApiController;
