import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientphotoApiController from "../../services/clientphoto.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const clientphotoStoreApi = createAsyncThunk("clientphoto/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientphotoUpdateApi = createAsyncThunk("clientphoto/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientphotoGridViewApi = createAsyncThunk("clientphoto/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientphotoDetailApi = createAsyncThunk("clientphoto/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientphotoDeleteApi = createAsyncThunk("clientphoto/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientphotoSuggetionListApi = createAsyncThunk("clientphoto/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientphotoApiController
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

const clientphotoSlice = createSlice({
  name: "clientphoto",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [clientphotoStoreApi.pending]: () => {},
    [clientphotoStoreApi.fulfilled]: () => {
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
    [clientphotoStoreApi.rejected]: () => {},
    [clientphotoUpdateApi.pending]: () => {},
    [clientphotoUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      let isGridView = state.isGridView && state.isGridView.data ? state.isGridView.data : state.isGridView;
      let isListView = state.isListView && state.isListView.data ? state.isListView.data : state.isListView;
      const existingGridData = isGridView ? isGridView.find((event) => event.id === id) : "";
      const existingListData = isListView ? isListView.find((event) => event.id === id) : "";
      if (existingGridData) {
        Object.keys(changes).map((keyName) => {
          existingGridData[keyName] = changes[keyName];
        });
      }
      if (existingListData) {
        Object.keys(changes).map((keyName) => {
          existingListData[keyName] = changes[keyName];
        });
      }
    },
    [clientphotoUpdateApi.rejected]: () => {},
    [clientphotoGridViewApi.pending]: () => {},
    [clientphotoGridViewApi.fulfilled]: (state, action) => {
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
    [clientphotoGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [clientphotoDeleteApi.pending]: () => {},
    [clientphotoDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset } = clientphotoSlice.actions;
export default clientphotoSlice.reducer;
