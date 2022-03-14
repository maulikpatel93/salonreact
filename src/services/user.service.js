import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const getUser = (values) => {
  console.log(values);
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const action = `afterlogin/user`;
  const data = {
    action: "user",
    auth_key,
  };
  return axios.post(API_URL + action, data, { headers: authHeader() });
};

const userApiController = {
  getUser,
};

export default userApiController;
