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
  const action = "afterlogin/busytime/store";
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
  const action = "afterlogin/busytime/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
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

  //Busy time Calender view parameter
  const start_date = values && values.start_date ? values.start_date : "";
  const end_date = values && values.end_date ? values.end_date : "";
  const timezone = values && values.timezone ? values.timezone : "";
  const type = values && values.type ? values.type : "";
  const staff_id = values && values.staff_id ? values.staff_id : "";
  const showdate = values && values.showdate ? values.showdate : "";
  //Busy time Calender view parameter close
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
  const action = page ? `afterlogin/busytime/view?page=${page}&${sortstring}` : `afterlogin/busytime/view?${sortstring}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: values && (values.id || start_date) ? false : pagination, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "dateof,start_time,end_time,repeats,repeat_time,repeat_time_option,ending,reason", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    result: result, //business_name,owner_name
    option: values && values.option ? values.option : "",
    client_id: values && values.client_id ? values.client_id : "",
    start_date: start_date,
    end_date: end_date,
    timezone: timezone,
    type: type,
    staff_id: staff_id,
    showdate: showdate,
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/busytime/delete/${values.id}`;
  const data = {
    auth_key: auth_key,
    action: action,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const busytimeApiController = {
  create,
  update,
  view,
  deleted,
};
export default busytimeApiController;
