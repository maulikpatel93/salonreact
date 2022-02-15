import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import salonmoduleApiController from "../../services/salonmodule.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const salonmoduleListViewApi = createAsyncThunk("salonmodule/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonmoduleApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonModuleAccessUpdateApi = createAsyncThunk("salonmodule/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await salonmoduleApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const initialState = {
  isListView: [],
};

const salonmoduleSlice = createSlice({
  name: "salonmodule",
  initialState,
  reducers: {
    reset: () => initialState,
    salonModuleAccessAction: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
      // console.log(changes);
      // state.isAddonServices = action.payload;
    },
  },
  extraReducers: {
    [salonmoduleListViewApi.pending]: () => {},
    [salonmoduleListViewApi.fulfilled]: (state, action) => {
      state.isListView = action.payload;
    },
    [salonmoduleListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [salonModuleAccessUpdateApi.pending]: () => {},
    [salonModuleAccessUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [salonModuleAccessUpdateApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, salonModuleAccessAction } = salonmoduleSlice.actions;
export default salonmoduleSlice.reducer;
