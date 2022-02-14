import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import salonpermissionApiController from "../../services/salonpermission.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const salonpermissionStoreApi = createAsyncThunk("salonpermission/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const salonpermissionUpdateApi = createAsyncThunk("salonpermission/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const salonpermissionListViewApi = createAsyncThunk("salonpermission/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonpermissionOptions = createAsyncThunk("salonpermission/salonpermissionOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "salonpermissionOptions"))
      .catch((error) => HandleError(thunkAPI, error, "salonpermissionOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonpermissionDetailApi = createAsyncThunk("salonpermission/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonpermissionDeleteApi = createAsyncThunk("salonpermission/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonpermissionSuggetionListApi = createAsyncThunk("salonpermission/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
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

const salonpermissionSlice = createSlice({
  name: "salonpermission",
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
    salonpermissionSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [salonpermissionStoreApi.pending]: () => {},
    [salonpermissionStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [salonpermissionStoreApi.rejected]: () => {},
    [salonpermissionUpdateApi.pending]: () => {},
    [salonpermissionUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [salonpermissionUpdateApi.rejected]: () => {},
    [salonpermissionListViewApi.pending]: () => {},
    [salonpermissionListViewApi.fulfilled]: (state, action) => {
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
    [salonpermissionListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [salonpermissionSuggetionListApi.pending]: () => {},
    [salonpermissionSuggetionListApi.fulfilled]: (state, action) => {
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
    [salonpermissionSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [salonpermissionDetailApi.pending]: () => {},
    [salonpermissionDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [salonpermissionDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [salonpermissionDeleteApi.pending]: () => {},
    [salonpermissionDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [salonpermissionDeleteApi.rejected]: () => {},
    [salonpermissionOptions.pending]: () => {},
    [salonpermissionOptions.fulfilled]: (state, action) => {
      state.isCategoryOption = action.payload;
    },
    [salonpermissionOptions.rejected]: (state) => {
      state.isCategoryOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddCategoryForm, closeAddCategoryForm, openEditCategoryForm, closeEditCategoryForm, openCategoryDetailModal, closeCategoryDetailModal, openCategorySearchList, closeCategorysearchList, salonpermissionSearchName } = salonpermissionSlice.actions;
export default salonpermissionSlice.reducer;
