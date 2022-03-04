import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import calendarApiController from "services/calendar.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const calendarStaffList = createAsyncThunk("staff/calendarStaffList", async (formValues, thunkAPI) => {
  try {
    const resposedata = await calendarApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'calendarStaffList'))
      .catch((error) => HandleError(thunkAPI, error, 'calendarStaffList'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


const initialState = {
  isTabView: "day",
  isRangeInfo: "",
  isStaffFilter: "",
  isCalendarStaffList: []
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    calendarTabWeekView: (state) => {
      state.isTabView = "week";
    },
    calendarTabDayView: (state) => {
      state.isTabView = "day";
    },
    calendarRangeInfo: (state, action) => {
      state.isRangeInfo = action.payload;
    },
    calendarStaffFilter: (state, action) => {
      state.isStaffFilter = action.payload;
    },
    calendarResetStaffFilter: (state) => {
      state.isStaffFilter = "";
    },
  },
  extraReducers: {
    [calendarStaffList.pending]: () => {},
    [calendarStaffList.fulfilled]: (state, action) => {
      state.isCalendarStaffList = action.payload;
    },
    [calendarStaffList.rejected]: (state) => {
      state.isCalendarStaffList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { calendarTabWeekView, calendarTabDayView, calendarRangeInfo, calendarStaffFilter, calendarResetStaffFilter } = calendarSlice.actions;
export default calendarSlice.reducer;
