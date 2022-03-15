import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import calendarApiController from "services/calendar.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const SignupStoreApi = createAsyncThunk("signup/create", async (formValues, thunkAPI) => {
  try {
    const resposedata = await calendarApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isSignupStep: 1,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset: () => initialState,
    PreviewStep: (state, action) => {
      state.isSignupStep = action.payload - 1;
    },
    NextStep: (state, action) => {
      state.isSignupStep = action.payload + 1;
    },
  },
  extraReducers: {
    [SignupStoreApi.pending]: () => {},
    [SignupStoreApi.fulfilled]: () => {},
    [SignupStoreApi.rejected]: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { reset, PreviewStep, NextStep } = signupSlice.actions;
export default signupSlice.reducer;
