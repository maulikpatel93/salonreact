import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import categoryApiController from "../../services/category.service";
import serviceApiController from "../../services/service.service";
import staffApiController from "../../services/staff.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const BookingCategoryOptions = createAsyncThunk("bookingbutton/categoryOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "categoryOptions"))
      .catch((error) => HandleError(thunkAPI, error, "categoryOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const BookingServiceOptions = createAsyncThunk("bookingbutton/serviceOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "serviceOptions"))
      .catch((error) => HandleError(thunkAPI, error, "serviceOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const BookingStaffOptions = createAsyncThunk("bookingbutton/staffOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "staffOptions"))
      .catch((error) => HandleError(thunkAPI, error, "staffOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isCategoryOption: [],
  isServiceOption: [],
  isStaffOption: [],
};

const bookingbuttonSlice = createSlice({
  name: "bookingbutton",
  initialState,
  reducers: {
    reset: () => initialState,
    BookingServiceOptionReset: (state) => {
      state.isServiceOption = [];
    },
    BookingStaffOptionReset: (state) => {
      state.isStaffOption = [];
    },
  },
  extraReducers: {
    [BookingCategoryOptions.pending]: () => {},
    [BookingCategoryOptions.fulfilled]: (state, action) => {
      state.isCategoryOption = action.payload;
    },
    [BookingCategoryOptions.rejected]: (state) => {
      state.isCategoryOption = [];
    },
    [BookingServiceOptions.pending]: () => {},
    [BookingServiceOptions.fulfilled]: (state, action) => {
      state.isServiceOption = action.payload;
    },
    [BookingServiceOptions.rejected]: (state) => {
      state.isServiceOption = [];
    },
    [BookingStaffOptions.pending]: () => {},
    [BookingStaffOptions.fulfilled]: (state, action) => {
      state.isStaffOption = action.payload;
    },
    [BookingStaffOptions.rejected]: (state) => {
      state.isStaffOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, BookingServiceOptionReset, BookingStaffOptionReset } = bookingbuttonSlice.actions;
export default bookingbuttonSlice.reducer;
