import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import dashboardApiController from "../../services/dashboard.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const UpcomingAppointmentListViewApi = createAsyncThunk("dashboard/UpcomingAppointmentListView", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await dashboardApiController
      .upcomingappointment(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "UpcomingAppointmentListView"))
      .catch((error) => HandleError(thunkAPI, error, "UpcomingAppointmentListView"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const DashboardViewApi = createAsyncThunk("dashboard/DashboardView", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await dashboardApiController
      .dashboardview(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "DashboardView"))
      .catch((error) => HandleError(thunkAPI, error, "DashboardView"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const initialState = {
  isUpComingAppointment: "",
  isDashboard: { appointments: 0, averageBookingValue: 0, numberofClients: 0, numberofNewClients: 0 },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [UpcomingAppointmentListViewApi.pending]: () => {},
    [UpcomingAppointmentListViewApi.fulfilled]: (state, action) => {
      state.isUpComingAppointment = action.payload;
    },
    [UpcomingAppointmentListViewApi.rejected]: () => {},
    [DashboardViewApi.pending]: () => {},
    [DashboardViewApi.fulfilled]: (state, action) => {
      state.isDashboard = action.payload;
    },
    [DashboardViewApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
