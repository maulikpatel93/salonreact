import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import notificationApiController from "../../services/notification.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const NotificationViewApi = createAsyncThunk("notification/NotificationView", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await notificationApiController
      .notificationview(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "NotificationView"))
      .catch((error) => HandleError(thunkAPI, error, "NotificationView"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const NotifcationUpdateApi = createAsyncThunk("notification/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await notificationApiController
      .update(formvalues, thunkAPI)
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
  isNotifyDetail: "",
  isNotifyPreview: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenNotificationForm: (state, action) => {
      state.isOpenNotificationForm = action.payload;
    },
    NotifyDetail: (state, action) => {
      state.isNotifyDetail = action.payload;
    },
    SetNotifyPreview: (state, action) => {
      state.isNotifyPreview = action.payload;
    },
  },
  extraReducers: {
    [NotificationViewApi.pending]: () => {},
    [NotificationViewApi.fulfilled]: (state, action) => {
      state.isNotification = action.payload;
    },
    [NotificationViewApi.rejected]: () => {},
    [NotifcationUpdateApi.pending]: () => {},
    [NotifcationUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [NotifcationUpdateApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenNotificationForm, NotifyDetail, SetNotifyPreview } = notificationSlice.actions;
export default notificationSlice.reducer;
