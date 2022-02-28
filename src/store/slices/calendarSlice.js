import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTabView: "day",
  isRangeInfo: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { calendarTabWeekView, calendarTabDayView, calendarRangeInfo } = calendarSlice.actions;
export default calendarSlice.reducer;
