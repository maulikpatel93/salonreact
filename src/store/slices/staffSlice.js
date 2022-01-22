import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffApiController from "../../services/staff.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const staffStoreApi = createAsyncThunk("staff/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const staffUpdateApi = createAsyncThunk("staff/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const staffGridViewApi = createAsyncThunk("staff/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const staffDetailApi = createAsyncThunk("staff/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const staffDeleteApi = createAsyncThunk("staff/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const staffSuggetionListApi = createAsyncThunk("staff/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addonstaffs = createAsyncThunk("staff/addonstaffs", async (formValues, thunkAPI) => {
  try {
    const resposedata = await staffApiController
      .addonstaffs(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "addonstaffs"))
      .catch((error) => HandleError(thunkAPI, error, "addonstaffs"));
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
  isTabView: "staff",
  isSort: "",
  isSearchList: "",
  isSearchName: "",
  isAddonStaffs: [],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    reset: () => initialState,
    staffTabView: (state, action) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = action.payload;
    },
    openAddStaffForm: (state = initialState) => {
      state.isOpenedAddForm = "open";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    closeAddStaffForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openEditStaffForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
      state.isOpenedDetailModal = "";
    },
    closeEditStaffForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openStaffDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeStaffDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    staffSort: (state, action) => {
      // let sort = state.isSort ? state.isSort : {};
      // state.isSort = Object.assign(sort, action.payload);
      state.isSort = action.payload;
    },
    staffSortRemove: (state) => {
      state.isSort = "";
    },
    openStaffSearchList: (state) => {
      state.isSearchList = "open";
    },
    closeStaffSearchList: (state) => {
      state.isSearchList = "";
    },
    staffSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    addonstaffsAction: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isAddonStaffs.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
      // console.log(changes);
      // state.isAddonStaffs = action.payload;
    },
  },
  extraReducers: {
    [staffStoreApi.pending]: () => {},
    [staffStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [staffStoreApi.rejected]: () => {},
    [staffUpdateApi.pending]: () => {},
    [staffUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [staffUpdateApi.rejected]: () => {},
    [staffGridViewApi.pending]: () => {},
    [staffGridViewApi.fulfilled]: (state, action) => {
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
    [staffGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [staffSuggetionListApi.pending]: () => {},
    [staffSuggetionListApi.fulfilled]: (state, action) => {
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
    [staffSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [staffDetailApi.pending]: () => {},
    [staffDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [staffDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [staffDeleteApi.pending]: () => {},
    [staffDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [staffDeleteApi.rejected]: () => {},
    [addonstaffs.pending]: () => {},
    [addonstaffs.fulfilled]: (state, action) => {
      state.isAddonStaffs = action.payload;
    },
    [addonstaffs.rejected]: (state) => {
      state.isAddonStaffs = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, staffTabView, openAddStaffForm, closeAddStaffForm, openEditStaffForm, closeEditStaffForm, staffTabGridView, openStaffDetailModal, closeStaffDetailModal, staffDetailTab, staffSort, staffSortRemove, openStaffSearchList, closeStaffSearchList, staffSearchName, addonstaffsAction } = staffSlice.actions;
export default staffSlice.reducer;
