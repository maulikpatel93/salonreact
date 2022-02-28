import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import appointmentApiController from "../../services/appointment.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const appointmentStoreApi = createAsyncThunk("appointment/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const appointmentUpdateApi = createAsyncThunk("appointment/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const appointmentListViewApi = createAsyncThunk("appointment/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientAppointmentListViewApi = createAsyncThunk("appointment/clientappointmentlistview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "clientappointmentlistview"))
      .catch((error) => HandleError(thunkAPI, error, "clientappointmentlistview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const appointmentOptions = createAsyncThunk("appointment/appointmentOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "appointmentOptions"))
      .catch((error) => HandleError(thunkAPI, error, "appointmentOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const appointmentDetailApi = createAsyncThunk("appointment/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const appointmentDeleteApi = createAsyncThunk("appointment/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const appointmentSuggetionListApi = createAsyncThunk("appointment/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await appointmentApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isOpenedAddForm: "",
  isOpenedEditForm: "",
  isOpenedDetailModal: "",
  isListView: [],
  isClientAppointmentListView: [],
  isDetailData: "",
  isFilter: "",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddAppointmentForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddAppointmentForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditAppointmentForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditAppointmentForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openAppointmentDetailModal: (state = initialState) => {
      state.isOpenedDetailModal = "open";
    },
    closeAppointmentDetailModal: (state = initialState) => {
      state.isOpenedDetailModal = "";
    },
    openAppointmentFilter: (state, action) => {
      state.isFilter = action.payload;
    },
    closeAppointmentFilter: (state) => {
      state.isFilter = "";
    },
  },
  extraReducers: {
    [appointmentStoreApi.pending]: () => {},
    [appointmentStoreApi.fulfilled]: () => {
      // if (state.isListView && state.isListView.data) {
      //   state.isListView.data = [action.payload, ...state.isListView.data];
      // } else {
      //   state.isListView = { data: [action.payload] };
      // }
    },
    [appointmentStoreApi.rejected]: () => {},
    [appointmentUpdateApi.pending]: () => {},
    [appointmentUpdateApi.fulfilled]: () => {},
    [appointmentUpdateApi.rejected]: () => {},
    [appointmentListViewApi.pending]: () => {},
    [appointmentListViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isListView.current_page ? state.isListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isListView && state.isListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isListView = action.payload;
    },
    [appointmentListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [clientAppointmentListViewApi.pending]: () => {},
    [clientAppointmentListViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isClientAppointmentListView.current_page ? state.isClientAppointmentListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isClientAppointmentListView && state.isClientAppointmentListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isClientAppointmentListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isClientAppointmentListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isClientAppointmentListView = action.payload;
    },
    [clientAppointmentListViewApi.rejected]: (state) => {
      state.isClientAppointmentListView = [];
    },
    [appointmentDetailApi.pending]: () => {},
    [appointmentDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [appointmentDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [appointmentDeleteApi.pending]: () => {},
    [appointmentDeleteApi.fulfilled]: () => {},
    [appointmentDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddAppointmentForm, closeAddAppointmentForm, openEditAppointmentForm, closeEditAppointmentForm, openAppointmentDetailModal, closeAppointmentDetailModal, openAppointmentFilter, closeAppointmentFilter } = appointmentSlice.actions;
export default appointmentSlice.reducer;
