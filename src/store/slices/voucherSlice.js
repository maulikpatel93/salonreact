import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import voucherApiController from "../../services/voucher.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const VoucherStoreApi = createAsyncThunk("voucher/create", async (formvalues, thunkAPI) => {
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

export const VoucherUpdateApi = createAsyncThunk("voucher/update", async (formvalues, thunkAPI) => {
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

export const VoucherGridViewApi = createAsyncThunk("voucher/gridview", async (formValues, thunkAPI) => {
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

export const VoucherOptions = createAsyncThunk("voucher/VoucherOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await voucherApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "VoucherOptions"))
      .catch((error) => HandleError(thunkAPI, error, "VoucherOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const VoucherDetailApi = createAsyncThunk("voucher/detail", async (formValues, thunkAPI) => {
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

export const VoucherDeleteApi = createAsyncThunk("voucher/delete", async (formValues, thunkAPI) => {
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
  isGridView: [],
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
    OpenAddVoucherForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddVoucherForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditVoucherForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditVoucherForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenVoucherDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseVoucherDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    setVoucherPreview: (state, action) => {
      state.isVoucherPreview = action.payload;
    },
  },
  extraReducers: {
    [VoucherStoreApi.pending]: () => {},
    [VoucherStoreApi.fulfilled]: () => {
      // if (state.isGridView && state.isGridView.data) {
      //   state.isGridView.data = [action.payload, ...state.isGridView.data];
      // } else {
      //   state.isGridView = { data: [action.payload] };
      // }
    },
    [VoucherStoreApi.rejected]: () => {},
    [VoucherUpdateApi.pending]: () => {},
    [VoucherUpdateApi.fulfilled]: () => {
      // const { id, ...changes } = action.payload;
      // const existingData = state.isGridView.data.find((event) => event.id === id);
      // if (existingData) {
      //   Object.keys(changes).map((keyName) => {
      //     existingData[keyName] = changes[keyName];
      //   });
      // }
    },
    [VoucherUpdateApi.rejected]: () => {},
    [VoucherGridViewApi.pending]: () => {},
    [VoucherGridViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isGridView.current_page ? state.isGridView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isGridView && state.isGridView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isGridView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isGridView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isGridView = action.payload;
    },
    [VoucherGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [VoucherDetailApi.pending]: () => {},
    [VoucherDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [VoucherDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [VoucherDeleteApi.pending]: () => {},
    [VoucherDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [VoucherDeleteApi.rejected]: () => {},
    [VoucherOptions.pending]: () => {},
    [VoucherOptions.fulfilled]: (state, action) => {
      state.isvoucherOption = action.payload;
    },
    [VoucherOptions.rejected]: (state) => {
      state.isvoucherOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddVoucherForm, CloseAddVoucherForm, OpenEditVoucherForm, CloseEditVoucherForm, OpenVoucherDetailModal, CloseVoucherDetailModal, openVoucherSearchList, closevouchersearchList, voucherSearchName, setVoucherPreview } = voucherSlice.actions;
export default voucherSlice.reducer;
