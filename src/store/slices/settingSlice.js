import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingApiController from "../../services/setting.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

const initialState = {
  isTabView: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    reset: () => initialState,
    SettingTabGridView: (state, action) => {
      state.isTabView = action.payload;
    },
  },
  extraReducers: {},
});
// Action creators are generated for each case reducer function
export const { reset, SettingTabGridView } = settingSlice.actions;
export default settingSlice.reducer;
