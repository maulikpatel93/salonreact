import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import closedateApiController from "../../services/closedate.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const CloseddateStoreApi = createAsyncThunk("closedate/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const CloseddateUpdateApi = createAsyncThunk("closedate/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const CloseddateListViewApi = createAsyncThunk("closedate/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CloseddateOptions = createAsyncThunk("closedate/closedateOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "closedateOptions"))
      .catch((error) => HandleError(thunkAPI, error, "closedateOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CloseddateDetailApi = createAsyncThunk("closedate/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CloseddateDeleteApi = createAsyncThunk("closedate/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CloseddateSuggetionListApi = createAsyncThunk("closedate/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await closedateApiController
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
};

const closedateSlice = createSlice({
  name: "closedate",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddCloseddateForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddCloseddateForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditCloseddateForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditCloseddateForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenCloseddateDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseCloseddateDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    OpenCloseddateSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseCloseddatesearchList: (state) => {
      state.isSearchList = "";
    },
    CloseddateSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [CloseddateStoreApi.pending]: () => {},
    [CloseddateStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [CloseddateStoreApi.rejected]: () => {},
    [CloseddateUpdateApi.pending]: () => {},
    [CloseddateUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [CloseddateUpdateApi.rejected]: () => {},
    [CloseddateListViewApi.pending]: () => {},
    [CloseddateListViewApi.fulfilled]: (state, action) => {
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
    [CloseddateListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [CloseddateSuggetionListApi.pending]: () => {},
    [CloseddateSuggetionListApi.fulfilled]: (state, action) => {
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
    [CloseddateSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [CloseddateDetailApi.pending]: () => {},
    [CloseddateDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [CloseddateDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [CloseddateDeleteApi.pending]: () => {},
    [CloseddateDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [CloseddateDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddCloseddateForm, CloseAddCloseddateForm, OpenEditCloseddateForm, CloseEditCloseddateForm, OpenCloseddateDetailModal, CloseCloseddateDetailModal, OpenCloseddateSearchList, CloseCloseddatesearchList, CloseddateSearchName } = closedateSlice.actions;
export default closedateSlice.reducer;
