import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import salonaccessApiController from "../../services/salonaccess.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const salonaccessStoreApi = createAsyncThunk("salonaccess/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const salonaccessUpdateApi = createAsyncThunk("salonaccess/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const salonaccessListViewApi = createAsyncThunk("salonaccess/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonaccessOptions = createAsyncThunk("salonaccess/salonaccessOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "salonaccessOptions"))
      .catch((error) => HandleError(thunkAPI, error, "salonaccessOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonaccessDetailApi = createAsyncThunk("salonaccess/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonaccessDeleteApi = createAsyncThunk("salonaccess/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonaccessSuggetionListApi = createAsyncThunk("salonaccess/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonaccessApiController
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
  isSuggetionListView: [],
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isCategoryOption: [],
};

const salonaccessSlice = createSlice({
  name: "salonaccess",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddCategoryForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddCategoryForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditCategoryForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditCategoryForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openCategoryDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeCategoryDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    openCategorySearchList: (state) => {
      state.isSearchList = "open";
    },
    closeCategorysearchList: (state) => {
      state.isSearchList = "";
    },
    salonaccessSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [salonaccessStoreApi.pending]: () => {},
    [salonaccessStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [salonaccessStoreApi.rejected]: () => {},
    [salonaccessUpdateApi.pending]: () => {},
    [salonaccessUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [salonaccessUpdateApi.rejected]: () => {},
    [salonaccessListViewApi.pending]: () => {},
    [salonaccessListViewApi.fulfilled]: (state, action) => {
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
    [salonaccessListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [salonaccessSuggetionListApi.pending]: () => {},
    [salonaccessSuggetionListApi.fulfilled]: (state, action) => {
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
    [salonaccessSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [salonaccessDetailApi.pending]: () => {},
    [salonaccessDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [salonaccessDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [salonaccessDeleteApi.pending]: () => {},
    [salonaccessDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [salonaccessDeleteApi.rejected]: () => {},
    [salonaccessOptions.pending]: () => {},
    [salonaccessOptions.fulfilled]: (state, action) => {
      state.isCategoryOption = action.payload;
    },
    [salonaccessOptions.rejected]: (state) => {
      state.isCategoryOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddCategoryForm, closeAddCategoryForm, openEditCategoryForm, closeEditCategoryForm, openCategoryDetailModal, closeCategoryDetailModal, openCategorySearchList, closeCategorysearchList, salonaccessSearchName } = salonaccessSlice.actions;
export default salonaccessSlice.reducer;
