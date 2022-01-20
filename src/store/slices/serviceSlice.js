import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceApiController from "../../services/service.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const serviceStoreApi = createAsyncThunk("service/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const serviceUpdateApi = createAsyncThunk("service/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const serviceListViewApi = createAsyncThunk("service/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const serviceDetailApi = createAsyncThunk("service/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const serviceDeleteApi = createAsyncThunk("service/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const serviceSuggetionListApi = createAsyncThunk("service/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addonservices = createAsyncThunk("service/addonservices", async (formValues, thunkAPI) => {
  try {
    const resposedata = await serviceApiController
      .addonservices(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "addonservices"))
      .catch((error) => HandleError(thunkAPI, error, "addonservices"));
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
  isTabView: "service",
  isSort: "",
  isSearchList: "",
  isSearchName: "",
  isAddonServices: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    reset: () => initialState,
    serviceTabView: (state, action) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = action.payload;
    },
    openAddServiceForm: (state = initialState) => {
      state.isOpenedAddForm = "open";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    closeAddServiceForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openEditServiceForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
      state.isOpenedDetailModal = "";
    },
    closeEditServiceForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openServiceDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeServiceDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    serviceSort: (state, action) => {
      // let sort = state.isSort ? state.isSort : {};
      // state.isSort = Object.assign(sort, action.payload);
      state.isSort = action.payload;
    },
    serviceSortRemove: (state) => {
      state.isSort = "";
    },
    openServiceSearchList: (state) => {
      state.isSearchList = "open";
    },
    closeServiceSearchList: (state) => {
      state.isSearchList = "";
    },
    serviceSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    addonservicesAction: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isAddonServices.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
      console.log(changes);
      state.isAddonServices = action.payload;
    },
  },
  extraReducers: {
    [serviceStoreApi.pending]: () => {},
    [serviceStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [serviceStoreApi.rejected]: () => {},
    [serviceUpdateApi.pending]: () => {},
    [serviceUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [serviceUpdateApi.rejected]: () => {},
    [serviceListViewApi.pending]: () => {},
    [serviceListViewApi.fulfilled]: (state, action) => {
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
    [serviceListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [serviceSuggetionListApi.pending]: () => {},
    [serviceSuggetionListApi.fulfilled]: (state, action) => {
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
    [serviceSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [serviceDetailApi.pending]: () => {},
    [serviceDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [serviceDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [serviceDeleteApi.pending]: () => {},
    [serviceDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [serviceDeleteApi.rejected]: () => {},
    [addonservices.pending]: () => {},
    [addonservices.fulfilled]: (state, action) => {
      state.isAddonServices = action.payload;
    },
    [addonservices.rejected]: (state) => {
      state.isAddonServices = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, serviceTabView, openAddServiceForm, closeAddServiceForm, openEditServiceForm, closeEditServiceForm, serviceTabGridView, openServiceDetailModal, closeServiceDetailModal, serviceDetailTab, serviceSort, serviceSortRemove, openServiceSearchList, closeServiceSearchList, serviceSearchName, addonservicesAction } = serviceSlice.actions;
export default serviceSlice.reducer;
