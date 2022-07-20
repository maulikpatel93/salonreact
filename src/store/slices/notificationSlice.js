import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import notificationApiController from "../../services/notification.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const NotifyDetailListViewApi = createAsyncThunk("notification/NotifyListView", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await notificationApiController
      .notifylistview(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "NotifyListView"))
      .catch((error) => HandleError(thunkAPI, error, "NotifyListView"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const NotifyDetailUpdateApi = createAsyncThunk("notification/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await notificationApiController
      .notifyupdate(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const initialState = {
  isOpenNotificationForm: "",
  isOpenNotificaitonSmsForm: "",
  isNotifyDetail: "",
  isNotifyPreview: "",
  isNotifySmsPreview: "",
  isNotifyDetailListView: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenNotificationForm: (state, action) => {
      state.isOpenNotificationForm = action.payload;
    },
    OpenNotificaitonSmsForm: (state, action) => {
      state.isOpenNotificaitonSmsForm = action.payload;
    },
    NotifyDetail: (state, action) => {
      state.isNotifyDetail = action.payload;
    },
    SetNotifyPreview: (state, action) => {
      state.isNotifyPreview = action.payload;
    },
    SetNotifySmsPreview: (state, action) => {
      state.isNotifySmsPreview = action.payload;
    },
  },
  extraReducers: {
    // [NotificationViewApi.pending]: () => {},
    // [NotificationViewApi.fulfilled]: (state, action) => {
    //   state.isNotification = action.payload;
    // },
    // [NotificationViewApi.rejected]: () => {},
    [NotifyDetailListViewApi.pending]: () => {},
    [NotifyDetailListViewApi.fulfilled]: (state, action) => {
      state.isNotifyDetailListView = action.payload;
    },
    [NotifyDetailListViewApi.rejected]: () => {},
    [NotifyDetailUpdateApi.pending]: () => {},
    [NotifyDetailUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isNotifyDetailListView.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [NotifyDetailUpdateApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenNotificationForm, OpenNotificaitonSmsForm, NotifyDetail, SetNotifyPreview, SetNotifySmsPreview } = notificationSlice.actions;
export default notificationSlice.reducer;
