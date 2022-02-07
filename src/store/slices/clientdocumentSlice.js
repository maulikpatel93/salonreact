import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientdocumentApiController from "../../services/clientdocument.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const clientdocumentStoreApi = createAsyncThunk("clientdocument/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientdocumentUpdateApi = createAsyncThunk("clientdocument/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientdocumentGridViewApi = createAsyncThunk("clientdocument/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientdocumentDetailApi = createAsyncThunk("clientdocument/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientdocumentDeleteApi = createAsyncThunk("clientdocument/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientdocumentSuggetionListApi = createAsyncThunk("clientdocument/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientdocumentApiController
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
  isGridView: []
};

const clientdocumentSlice = createSlice({
  name: "clientdocument",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [clientdocumentStoreApi.pending]: () => {},
    [clientdocumentStoreApi.fulfilled]: () => {
      // if (state.isGridView && state.isGridView.data) {
      //   state.isGridView.data = [action.payload, ...state.isGridView.data];
      // } else {
      //   state.isGridView = { data: [action.payload] };
      // }
      // if (state.isListView && state.isListView.data) {
      //   state.isListView.data = [action.payload, ...state.isListView.data];
      // } else {
      //   state.isListView = { data: [action.payload] };
      // }
    },
    [clientdocumentStoreApi.rejected]: () => {},
    [clientdocumentUpdateApi.pending]: () => {},
    [clientdocumentUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      let isGridView = state.isGridView && state.isGridView.data ? state.isGridView.data : state.isGridView;
      const existingGridData = isGridView ? isGridView.find((event) => event.id === id) : "";
      if (existingGridData) {
        Object.keys(changes).map((keyName) => {
          existingGridData[keyName] = changes[keyName];
        });
      }
    },
    [clientdocumentUpdateApi.rejected]: () => {},
    [clientdocumentGridViewApi.pending]: () => {},
    [clientdocumentGridViewApi.fulfilled]: (state, action) => {
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
    [clientdocumentGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [clientdocumentDeleteApi.pending]: () => {},
    [clientdocumentDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset } = clientdocumentSlice.actions;
export default clientdocumentSlice.reducer;
