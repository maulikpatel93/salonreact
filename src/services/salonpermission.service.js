import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const view = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const role_id = values && values.staff_id;
  const salon_id = values && values.salon_id;
  const action = `afterlogin/salonpermission/view`;
  const data = {
    auth_key: auth_key,
    action: action,
    role_id: role_id,
    salon_id: salon_id,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const salonpermissionApiController = {
  view,
};
export default salonpermissionApiController;
