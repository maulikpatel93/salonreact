import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingApiController from "../../services/setting.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const MailChimpSubscribeApi = createAsyncThunk("setting/mailchimpsubscribe", async (formValues, thunkAPI) => {
  try {
    const resposedata = await settingApiController
      .mailchimpsubscribe(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "mailchimpsubscribe"))
      .catch((error) => HandleError(thunkAPI, error, "mailchimpsubscribe"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isTabView: "",
  isOpenedMailchimpForm: "",
  isMailchimpData: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    reset: () => initialState,
    SettingTabGridView: (state, action) => {
      state.isTabView = action.payload;
    },
    OpenMailchimpForm: (state, action) => {
      state.isOpenedMailchimpForm = action.payload;
    },
  },
  extraReducers: {
    [MailChimpSubscribeApi.pending]: () => {},
    [MailChimpSubscribeApi.fulfilled]: (state, action) => {
      state.isMailchimpData = action.payload;
    },
    [MailChimpSubscribeApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, SettingTabGridView, OpenMailchimpForm } = settingSlice.actions;
export default settingSlice.reducer;
