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
  const action = "afterlogin/appointment/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const clickEvent = values && values.clickEvent;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  let action = "afterlogin/appointment/update/" + values.id;
  if (clickEvent && clickEvent === "statusupdate") {
    action = "afterlogin/appointment/status/" + values.id;
  }
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
  //Appointment Calender view parameter
  const start_date = values && values.start_date ? values.start_date : "";
  const end_date = values && values.end_date ? values.end_date : "";
  const timezone = values && values.timezone ? values.timezone : "";
  const type = values && values.type ? values.type : "";
  //Appointment Calender view parameter close
  const filter = values && values.filter ? JSON.stringify(values.filter) : "";
  if (filter === "") {
    store.dispatch({ type: "appointment/closeAppointmentFilter" });
  }
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
  const action = page ? `afterlogin/appointment/view?page=${page}&${sortstring}` : `afterlogin/appointment/view?${sortstring}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: values && (values.id || start_date) ? false : pagination, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "date,start_time,end_time,duration,cost,repeats,booking_notes,status,cancellation_reason,reschedule,reschedule_at", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    result: result, //business_name,owner_name
    filter: filter, //business_name,owner_name
    option: values && values.option ? values.option : "",
    client_id: values && values.client_id ? values.client_id : "",
    start_date: start_date,
    end_date: end_date,
    timezone: timezone,
    type: type,
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/appointment/delete/${values.id}`;
  const data = {
    auth_key: auth_key,
    action: action,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const appointmentApiController = {
  create,
  update,
  view,
  deleted,
};
export default appointmentApiController;
