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
    if (["myFiles"].includes(value) && values[value] && typeof values[value] === "object") {
      values.myFiles.forEach((photo, index) => {
        formData.append(`photo[${index}]`, photo);
      });
    } else {
      formData.append(value, values[value]);
    }
  }
  const action = "afterlogin/clientphoto/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  formData.append("client_id", values.client_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const update = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  const action = "afterlogin/clientphoto/update/" + values.id;
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  formData.append("client_id", values.client_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  const result = values && values.result ? values.result : "";
  const client_id = values && values.client_id;
  if(client_id){
    const action = page ? `afterlogin/clientphoto/view?page=${page}` : `afterlogin/clientphoto/view`;
    const data = {
      auth_key: auth_key,
      action: action,
      salon_id: auth.user.salon_id,
      pagination: values && values.id ? false : true, //true or false
      id: values && values.id ? values.id : "",
      client_id: values && values.client_id ? values.client_id : "",
      field: values && values.id ? "" : "name,is_profile_photo", // first_name,last_name,email
      salon_field: false, //business_name,owner_name
      result: result, //business_name,owner_name
    };
    return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
  }
  return true;
};

const deleted = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/clientphoto/delete/${values.id}`;
  const data = {
    auth_key: auth_key,
    action: action,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};


const clientphotoApiController = {
  create,
  update,
  view,
  deleted
};
export default clientphotoApiController;
