import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import busytimeApiController from "../../services/busytime.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const busytimeStoreApi = createAsyncThunk("busytime/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const busytimeUpdateApi = createAsyncThunk("busytime/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const busytimeListViewApi = createAsyncThunk("busytime/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const busytimeOptions = createAsyncThunk("busytime/busytimeOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "busytimeOptions"))
      .catch((error) => HandleError(thunkAPI, error, "busytimeOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const busytimeDetailApi = createAsyncThunk("busytime/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const busytimeDeleteApi = createAsyncThunk("busytime/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const busytimeSuggetionListApi = createAsyncThunk("busytime/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await busytimeApiController
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
  isListView: [],
  isDetailData: "",
};

const busytimeSlice = createSlice({
  name: "busytime",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddBusytimeForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddBusytimeForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditBusytimeForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditBusytimeForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
  },
  extraReducers: {
    [busytimeStoreApi.pending]: () => {},
    [busytimeStoreApi.fulfilled]: (state, action) => {
      // if (state.isListView && state.isListView.data) {
      //   state.isListView.data = [action.payload, ...state.isListView.data];
      // } else {
      //   state.isListView = { data: [action.payload] };
      // }
    },
    [busytimeStoreApi.rejected]: () => {},
    [busytimeUpdateApi.pending]: () => {},
    [busytimeUpdateApi.fulfilled]: (state, action) => {
      // const { id, ...changes } = action.payload;
      // const existingData = state.isListView.data && state.isListView.data.find((event) => event.id === id);
      // if (existingData) {
      //   Object.keys(changes).map((keyName) => {
      //     existingData[keyName] = changes[keyName];
      //   });
      // }
    },
    [busytimeUpdateApi.rejected]: () => {},
    [busytimeListViewApi.pending]: () => {},
    [busytimeListViewApi.fulfilled]: (state, action) => {
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
    [busytimeListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [busytimeDetailApi.pending]: () => {},
    [busytimeDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [busytimeDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [busytimeDeleteApi.pending]: () => {},
    [busytimeDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [busytimeDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddBusytimeForm, closeAddBusytimeForm, openEditBusytimeForm, closeEditBusytimeForm } = busytimeSlice.actions;
export default busytimeSlice.reducer;
