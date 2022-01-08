import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const sort = values && values.sort;
  const page = values && values.page;
  const next_page_url = values && values.next_page_url;
  const result = values && values.result ? values.result : '';
  let sortstring = "";
  if (sort) {
    let sortArray = [];
    Object.keys(sort).map(function (key, index) {
      sortArray[index] = `sort[${key}]=${sort[key]}`;
    });
    if (sortArray.length > 0) {
      let jsort = sortArray.join("&");
      sortstring = jsort;
    }
  }
  const pagination = values && values.option ? false : true;
  const action = page ? `afterlogin/tax/view?page=${page}&${sortstring}` : `afterlogin/tax/view?${sortstring}`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: values && values.id ? false : pagination, //true or false
    id: values && values.id ? values.id : "",
    field: values && values.id ? "" : "name,description,percentage", // first_name,last_name,email
    salon_field: false, //business_name,owner_name
    result: result, //business_name,owner_name
    option: values && values.option ? values.option : ''
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const taxApiController = {
  view
};
export default taxApiController;
