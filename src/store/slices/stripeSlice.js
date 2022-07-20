import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import stripeApiController from "services/stripe.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const StripeSetupApi = createAsyncThunk("stripe/setup", async (formValues, thunkAPI) => {
  try {
    const resposedata = await stripeApiController
      .setup(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "setup"))
      .catch((error) => HandleError(thunkAPI, error, "setup"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const StripeCardPaymentApi = createAsyncThunk("stripe/cardpayment", async (formValues, thunkAPI) => {
  try {
    const resposedata = await stripeApiController
      .cardpayment(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "cardpayment"))
      .catch((error) => HandleError(thunkAPI, error, "cardpayment"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const StripeOauthApi = createAsyncThunk("stripe/Oauth", async (formValues, thunkAPI) => {
  try {
    const resposedata = await stripeApiController
      .oauth(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "Oauth"))
      .catch((error) => HandleError(thunkAPI, error, "Oauth"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isOpenedAddForm: "",
  isStripePaymentStatus: "",
  isStripeOauth: "",
};

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddStripeForm: (state = initialState) => {
      state.isOpenedAddForm = "open";
    },
    CloseAddStripeForm: (state = initialState) => {
      state.isOpenedAddForm = "";
    },
    StripePaymentStatus: (state, action) => {
      state.isStripePaymentStatus = action.payload;
    },
  },
  extraReducers: {
    [StripeSetupApi.pending]: () => {},
    [StripeSetupApi.fulfilled]: () => {},
    [StripeSetupApi.rejected]: () => {},
    [StripeOauthApi.pending]: () => {},
    [StripeOauthApi.fulfilled]: (state, action) => {
      state.isStripeOauth = action.payload;
    },
    [StripeOauthApi.rejected]: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { reset, OpenAddStripeForm, CloseAddStripeForm, StripePaymentStatus } = stripeSlice.actions;
export default stripeSlice.reducer;
