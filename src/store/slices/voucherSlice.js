import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import voucherApiController from "../../services/voucher.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const voucherStoreApi = createAsyncThunk("voucher/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const voucherUpdateApi = createAsyncThunk("voucher/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const voucherListViewApi = createAsyncThunk("voucher/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const voucherOptions = createAsyncThunk("voucher/voucherOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "voucherOptions"))
      .catch((error) => HandleError(thunkAPI, error, "voucherOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const voucherDetailApi = createAsyncThunk("voucher/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const voucherDeleteApi = createAsyncThunk("voucher/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
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
  isSuggetionListView: [],
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isvoucherOption: [],
  isVoucherPreview: [],
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddVoucherForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddVoucherForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditVoucherForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditVoucherForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openVoucherDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeVoucherDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    setVoucherPreview: (state, action) => {
      state.isVoucherPreview = action.payload;
    },
  },
  extraReducers: {
    [voucherStoreApi.pending]: () => {},
    [voucherStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [voucherStoreApi.rejected]: () => {},
    [voucherUpdateApi.pending]: () => {},
    [voucherUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [voucherUpdateApi.rejected]: () => {},
    [voucherListViewApi.pending]: () => {},
    [voucherListViewApi.fulfilled]: (state, action) => {
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
    [voucherListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [voucherDetailApi.pending]: () => {},
    [voucherDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [voucherDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [voucherDeleteApi.pending]: () => {},
    [voucherDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [voucherDeleteApi.rejected]: () => {},
    [voucherOptions.pending]: () => {},
    [voucherOptions.fulfilled]: (state, action) => {
      state.isvoucherOption = action.payload;
    },
    [voucherOptions.rejected]: (state) => {
      state.isvoucherOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddVoucherForm, closeAddVoucherForm, openEditVoucherForm, closeEditVoucherForm, openVoucherDetailModal, closeVoucherDetailModal, openVoucherSearchList, closevouchersearchList, voucherSearchName, setVoucherPreview } = voucherSlice.actions;
export default voucherSlice.reducer;
