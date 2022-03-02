import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { checkobject } from "helpers/functions";
import rosterApiController from "../../services/roster.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const rosterStoreApi = createAsyncThunk("roster/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const rosterUpdateApi = createAsyncThunk("roster/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const rosterListViewApi = createAsyncThunk("roster/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const rosterOptions = createAsyncThunk("roster/rosterOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "rosterOptions"))
      .catch((error) => HandleError(thunkAPI, error, "rosterOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const rosterDetailApi = createAsyncThunk("roster/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const rosterDeleteApi = createAsyncThunk("roster/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
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
  isDeleteModal: "",
  isListView: [],
  isStaffFilter: "",
};

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddRosterForm: (state = initialState, action) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = action.payload;
    },
    closeAddRosterForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditRosterForm: (state = initialState, action) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = action.payload;
    },
    closeEditRosterForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openDeleteModal: (state, action) => {
      state.isDeleteModal = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModal = "";
    },
    staffFilter: (state, action) => {
      state.isStaffFilter = action.payload;
    },
    resetStaffFilter: (state) => {
      state.isStaffFilter = "";
    },
  },
  extraReducers: {
    [rosterStoreApi.pending]: () => {},
    [rosterStoreApi.fulfilled]: () => {
      // if (state.isListView && state.isListView.data) {
      //   state.isListView.data = [action.payload, ...state.isListView.data];
      // } else {
      //   state.isListView = { data: [action.payload] };
      // }
    },
    [rosterStoreApi.rejected]: () => {},
    [rosterUpdateApi.pending]: () => {},
    [rosterUpdateApi.fulfilled]: () => {
      // const { id, ...changes } = action.payload;
      // const existingData = state.isListView.data.find((event) => event.id === id);
      // if (existingData) {
      //   Object.keys(changes).map((keyName) => {
      //     existingData[keyName] = changes[keyName];
      //   });
      // }
    },
    [rosterUpdateApi.rejected]: () => {},
    [rosterListViewApi.fulfilled]: (state, action) => {
      if (checkobject(action.payload) === true) {
        state.isListView = [action.payload];
      } else {
        let old_current_page = state.isListView.current_page ? state.isListView.current_page : "";
        let new_current_page = action.payload.current_page ? action.payload.current_page : "";
        let viewdata = state.isListView && state.isListView.data;
        let newviewdata = action.payload && action.payload.data;
        state.isListView = action.payload;
        if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
          viewdata && newviewdata ? (state.isListView.data = [...viewdata, ...newviewdata]) : action.payload;
        }
        state.isListView = action.payload;
      }
    },
    [rosterListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [rosterDeleteApi.pending]: () => {},
    [rosterDeleteApi.fulfilled]: () => {},
    [rosterDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddRosterForm, closeAddRosterForm, openEditRosterForm, closeEditRosterForm, openDeleteModal, closeDeleteModal, staffFilter, resetStaffFilter } = rosterSlice.actions;
export default rosterSlice.reducer;
