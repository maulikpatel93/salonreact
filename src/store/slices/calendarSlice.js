import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTabView: "day",
  isRangeInfo: "",
  isStaffFilter: "",
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
});

// Action creators are generated for each case reducer function
export const { calendarTabWeekView, calendarTabDayView, calendarRangeInfo, calendarStaffFilter, calendarResetStaffFilter } = calendarSlice.actions;
export default calendarSlice.reducer;
