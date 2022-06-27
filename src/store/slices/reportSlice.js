import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import reportApiController from "../../services/report.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
import { checkobject } from "helpers/functions";

export const usersAdapter = createEntityAdapter();

export const ReportListViewApi = createAsyncThunk("report/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await reportApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const PrintoutApi = createAsyncThunk("report/Printout", async (formValues, thunkAPI) => {
  try {
    const resposedata = await reportApiController
      .printout(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "Printout"))
      .catch((error) => HandleError(thunkAPI, error, "Printout"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isListView: [],
  isOpenListModal: "",
  isScreenReport: "",
  isStaffFilter: "",
  isSupplierFilter: "",
  isServiceFilter: "",
  isProductFilter: "",
  isPrint: "",
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenListModal: (state = initialState, action) => {
      state.isOpenListModal = action.payload;
    },
    ScreenReport: (state, action) => {
      state.isScreenReport = action.payload;
    },
    StaffFilter: (state, action) => {
      state.isStaffFilter = action.payload;
    },
    ResetStaffFilter: (state) => {
      state.isStaffFilter = "";
    },
    SupplierFilter: (state, action) => {
      state.isSupplierFilter = action.payload;
    },
    ResetSupplierFilter: (state) => {
      state.isSupplierFilter = "";
    },
    ServiceFilter: (state, action) => {
      state.isServiceFilter = action.payload;
    },
    ResetServiceFilter: (state) => {
      state.isServiceFilter = "";
    },
    ProductFilter: (state, action) => {
      state.isProductFilter = action.payload;
    },
    ResetProductFilter: (state) => {
      state.isProductFilter = "";
    },
    PrintContent: (state, action) => {
      state.isPrint = action.payload;
    },
  },
  extraReducers: {
    [ReportListViewApi.fulfilled]: (state, action) => {
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
    [ReportListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [PrintoutApi.pending]: () => {},
    [PrintoutApi.fulfilled]: (state, action) => {
      state.isPrint = action.payload;
    },
    [PrintoutApi.rejected]: (state) => {
      state.isPrint = "";
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenListModal, ScreenReport, StaffFilter, ResetStaffFilter, SupplierFilter, ResetSupplierFilter, ServiceFilter, ResetServiceFilter, ProductFilter, ResetProductFilter, PrintContent } = reportSlice.actions;
export default reportSlice.reducer;
