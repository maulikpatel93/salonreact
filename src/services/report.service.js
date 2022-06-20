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
  const ScreenReport = values && values.ScreenReport ? values.ScreenReport : "";
  const daterange = values && values.daterange ? values.daterange : "";
  const staff_id = values && values.staff_id ? values.staff_id : "";

  let pagination = values && values.option ? false : true;
  // if (ScreenReport == "performance_summary") {
    
  // }
  pagination = false;
  const action = page ? `afterlogin/report/view?page=${page}` : `afterlogin/report/view`;
  const data = {
    auth_key: auth_key,
    action: action,
    salon_id: auth.user.salon_id,
    pagination: values && values.id ? false : pagination, //true or false
    result: result, //business_name,owner_name
    ScreenReport: ScreenReport,
    daterange: daterange,
    staff_id: staff_id,
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const reportApiController = {
  view,
};
export default reportApiController;
