import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import salonmoduleApiController from "../../services/salonmodule.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const salonmoduleListViewApi = createAsyncThunk("salonmodule/modulelistview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonmoduleApiController
      .moduleview(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "modulelistview"))
      .catch((error) => HandleError(thunkAPI, error, "modulelistview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const salonmoduleAccessViewApi = createAsyncThunk("salonmodule/accesslistview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonmoduleApiController
      .accessview(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "accesslistview"))
      .catch((error) => HandleError(thunkAPI, error, "accesslistview"));
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
  isAccessView: [],
  isAccess: [],
};

const salonmoduleSlice = createSlice({
  name: "salonmodule",
  initialState,
  reducers: {
    reset: () => initialState,
    salonModuleAccessAction: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isAccessView.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
      // console.log(changes);
      // state.isAddonServices = action.payload;
    }
  },
  extraReducers: {
    [salonmoduleListViewApi.pending]: () => {},
    [salonmoduleListViewApi.fulfilled]: (state, action) => {
      state.isListView = action.payload;
    },
    [salonmoduleListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [salonmoduleAccessViewApi.pending]: () => {},
    [salonmoduleAccessViewApi.fulfilled]: (state, action) => {
      state.isAccessView = action.payload;
      const accessdata = state.isAccessView;
      let permissionModule = [];
      accessdata.map((list) => {
        let permission = [];
        list.salonpermission
          .filter((perm) => perm.access === true)
          .map((perm) => {
            permission.push(perm.name);
          });
        permissionModule.push({ permission: permission, module_id: list.id, controller: list.controller });
      });
      state.isAccess = permissionModule;
    },
    [salonmoduleAccessViewApi.rejected]: (state) => {
      state.isAccessView = [];
    },
    [salonModuleAccessUpdateApi.pending]: () => {},
    [salonModuleAccessUpdateApi.fulfilled]: () => {},
    [salonModuleAccessUpdateApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, salonModuleAccessAction } = salonmoduleSlice.actions;
export default salonmoduleSlice.reducer;
