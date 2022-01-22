import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import pricetierApiController from "../../services/pricetier.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const pricetierStoreApi = createAsyncThunk("pricetier/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const pricetierUpdateApi = createAsyncThunk("pricetier/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const pricetierGridViewApi = createAsyncThunk("pricetier/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const pricetierOptions = createAsyncThunk("pricetier/pricetierOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "pricetierOptions"))
      .catch((error) => HandleError(thunkAPI, error, "pricetierOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const pricetierDetailApi = createAsyncThunk("pricetier/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const pricetierDeleteApi = createAsyncThunk("pricetier/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await pricetierApiController
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
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isPriceTierOption: [],
};

const pricetierSlice = createSlice({
  name: "pricetier",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddPriceTierForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddPriceTierForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditPriceTierForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditPriceTierForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openPriceTierDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closePriceTierDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    openPriceTierSearchList: (state) => {
      state.isSearchList = "open";
    },
    closePriceTiersearchList: (state) => {
      state.isSearchList = "";
    },
    priceTierSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [pricetierStoreApi.pending]: () => {},
    [pricetierStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [pricetierStoreApi.rejected]: () => {},
    [pricetierUpdateApi.pending]: () => {},
    [pricetierUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [pricetierUpdateApi.rejected]: () => {},
    [pricetierGridViewApi.pending]: () => {},
    [pricetierGridViewApi.fulfilled]: (state, action) => {
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
    [pricetierGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [pricetierDetailApi.pending]: () => {},
    [pricetierDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [pricetierDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [pricetierDeleteApi.pending]: () => {},
    [pricetierDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [pricetierDeleteApi.rejected]: () => {},
    [pricetierOptions.pending]: () => {},
    [pricetierOptions.fulfilled]: (state, action) => {
      state.isPriceTierOption = action.payload;
    },
    [pricetierOptions.rejected]: (state) => {
      state.isPriceTierOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddPriceTierForm, closeAddPriceTierForm, openEditPriceTierForm, closeEditPriceTierForm, openPriceTierDetailModal, closePriceTierDetailModal, openPriceTierSearchList, closePriceTiersearchList, priceTierSearchName } = pricetierSlice.actions;
export default pricetierSlice.reducer;
