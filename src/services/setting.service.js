import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  const result = values && values.result ? values.result : "";
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
  return axios.post(next_page_url ? `${next_page_url}` : API_URL + action, data, { headers: authHeader() });
};


const settingApiController = {
  view
};
export default settingApiController;
