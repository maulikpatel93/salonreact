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
  const supplier_id = values && values.supplier_id ? values.supplier_id : "";
  const service_id = values && values.service_id ? values.service_id : "";
  const product_id = values && values.product_id ? values.product_id : "";
  const month = values && values.month ? values.month : "";

  let pagination = values && values.pagination ? values.pagination : "";

  if (pagination) {
    pagination = values && values.option ? false : true;
  } else {
    pagination = false;
  }

  if (ScreenReport === "gift_vouchers") {
    pagination = true;
  }

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
    supplier_id: supplier_id,
    service_id: service_id,
    product_id: product_id,
    month: month,
  };
  return axios.post(next_page_url ? `${next_page_url}&${sortstring}` : API_URL + action, data, { headers: authHeader() });
};

const printout = (values) => {
  
};

const reportApiController = {
  view,
  printout,
};
export default reportApiController;
