import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import businessApiController from "../../services/business.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const BusinessUpdateApi = createAsyncThunk("business/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await businessApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});
export const TimezoneApi = createAsyncThunk("business/timezone", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await businessApiController
      .timezone(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "timezone"))
      .catch((error) => HandleError(thunkAPI, error, "timezone"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const initialState = {
  isOpenedAddForm: "",
  isTimezone: "",
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [BusinessUpdateApi.pending]: () => {},
    [BusinessUpdateApi.fulfilled]: () => {},
    [BusinessUpdateApi.rejected]: () => {},
    [TimezoneApi.pending]: () => {},
    [TimezoneApi.fulfilled]: (state, action) => {
      state.isTimezone = action.payload;
    },
    [TimezoneApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset } = businessSlice.actions;
export default businessSlice.reducer;
