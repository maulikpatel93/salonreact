import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingApiController from "../../services/setting.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

const initialState = {
  isTabView: [],
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    reset: () => initialState,
    openPhotoDrawer: (state) => {
      state.isPhotoDrawer = "open";
    }
  },
  extraReducers: {},
});
// Action creators are generated for each case reducer function
export const { reset } = settingSlice.actions;
export default settingSlice.reducer;
