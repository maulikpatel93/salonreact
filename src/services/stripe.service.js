import axios from "axios";
import { store } from "../store";
import config from "../config";
import authHeader from "./auth-header";

const API_URL = config.API_URL;

const setup = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  const action = "afterlogin/stripe/setup";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const cardpayment = (values) => {
  const auth = store.getState().auth;
  const auth_key = auth.user.auth_key;
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  // const stripe = require('stripe')('sk_test_51Ko2rOSFsrov7HTSJAkhuTXyQiUGw5kfiU67lVR7riELEoXvcoUI6duFWM6djjYVNwmvGMec5OhyVeZyy5X3eRcj00r1l2zaoX');
  // const token = await stripe.tokens.create({
  //   card: {
  //     number: '4242424242424242',
  //     exp_month: 4,
  //     exp_year: 2023,
  //     cvc: '314',
  //   },
  // });
  const action = "afterlogin/stripe/store";
  formData.append("auth_key", auth_key);
  formData.append("action", action);
  formData.append("salon_id", auth.user.salon_id);
  return axios.post(API_URL + action, formData, { headers: authHeader({ contentType: "multipart/form-data" }) });
};

const stripeApiController = {
  setup,
  cardpayment,
};
export default stripeApiController;
