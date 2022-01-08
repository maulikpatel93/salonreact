import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import supplierApiController from "../../services/supplier.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const usersAdapter = createEntityAdapter();

export const supplierStoreApi = createAsyncThunk("supplier/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'create'))
      .catch((error) => HandleError(thunkAPI, error, 'create'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const supplierUpdateApi = createAsyncThunk("supplier/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'update'))
      .catch((error) => HandleError(thunkAPI, error, 'update'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const supplierGridViewApi = createAsyncThunk("supplier/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'gridview'))
      .catch((error) => HandleError(thunkAPI, error, 'gridview'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const supplierOptions = createAsyncThunk("supplier/supplierOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'supplierOptions'))
      .catch((error) => HandleError(thunkAPI, error, 'supplierOptions'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const supplierDetailApi = createAsyncThunk("supplier/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'detail'))
      .catch((error) => HandleError(thunkAPI, error, 'detail'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const supplierDeleteApi = createAsyncThunk("supplier/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'delete'))
      .catch((error) => HandleError(thunkAPI, error, 'delete'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const supplierSuggetionListApi = createAsyncThunk("supplier/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await supplierApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'suggetionlist'))
      .catch((error) => HandleError(thunkAPI, error, 'suggetionlist'));
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
  isSupplierOption: [],
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddSupplierForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddSupplierForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditSupplierForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditSupplierForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openSupplierDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeSupplierDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    openSupplierSearchList: (state) => {
      state.isSearchList = "open";
    },
    closeSupplierSearchList: (state) => {
      state.isSearchList = "";
    },
    supplierSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [supplierStoreApi.pending]: () => {},
    [supplierStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [supplierStoreApi.rejected]: () => {},
    [supplierUpdateApi.pending]: () => {},
    [supplierUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [supplierUpdateApi.rejected]: () => {},
    [supplierGridViewApi.pending]: () => {},
    [supplierGridViewApi.fulfilled]: (state, action) => {
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
    [supplierGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [supplierSuggetionListApi.pending]: () => {},
    [supplierSuggetionListApi.fulfilled]: (state, action) => {
      let old_current_page = state.isSuggetionListView.current_page ? state.isSuggetionListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isSuggetionListView && state.isSuggetionListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isSuggetionListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isSuggetionListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isSuggetionListView = action.payload;
    },
    [supplierSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [supplierDetailApi.pending]: () => {},
    [supplierDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [supplierDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [supplierDeleteApi.pending]: () => {},
    [supplierDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [supplierDeleteApi.rejected]: () => {},
    [supplierOptions.pending]: () => {},
    [supplierOptions.fulfilled]: (state, action) => {
      state.isSupplierOption = action.payload;
    },
    [supplierOptions.rejected]: (state) => {
      state.isSupplierOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddSupplierForm, closeAddSupplierForm, openEditSupplierForm, closeEditSupplierForm, openSupplierDetailModal, closeSupplierDetailModal, openSupplierSearchList, closeSupplierSearchList, supplierSearchName } = supplierSlice.actions;
export default supplierSlice.reducer;
