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

  // const pagination = values && values.option ? false : true;
  const action = page ? `afterlogin/staff/view?page=${page}}` : `afterlogin/staff/view`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: false, //true or false
    id: values && values.id ? values.id : "",
    field: "first_name,last_name,email,profile_photo,phone_number", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    price_tier_field: "name", //business_name,owner_name
    result: result, //business_name,owner_name
    staff_working_hours_field: false,
    staff_service_field: false,
    roster_field: false,
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const calendarApiController = {
  view,
};
export default calendarApiController;
