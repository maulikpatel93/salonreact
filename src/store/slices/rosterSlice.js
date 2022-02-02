import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
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

export const rosterGridViewApi = createAsyncThunk("roster/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await rosterApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
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
  isOpenedEditForm: ""
};

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddRosterForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddRosterForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditRosterForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditRosterForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    }
  },
  extraReducers: {
    [rosterStoreApi.pending]: () => {},
    [rosterStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [rosterStoreApi.rejected]: () => {},
    [rosterUpdateApi.pending]: () => {},
    [rosterUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [rosterUpdateApi.rejected]: () => {}
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddRosterForm, closeAddRosterForm, openEditRosterForm, closeEditRosterForm } = rosterSlice.actions;
export default rosterSlice.reducer;
