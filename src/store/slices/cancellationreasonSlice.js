import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import cancellationreasonApiController from "../../services/cancellationreason.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const CancellationreasonStoreApi = createAsyncThunk("cancellationreason/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const CancellationreasonUpdateApi = createAsyncThunk("cancellationreason/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const CancellationreasonListViewApi = createAsyncThunk("cancellationreason/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CancellationreasonOptions = createAsyncThunk("cancellationreason/cancellationreasonOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "cancellationreasonOptions"))
      .catch((error) => HandleError(thunkAPI, error, "cancellationreasonOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CancellationreasonDetailApi = createAsyncThunk("cancellationreason/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CancellationreasonDeleteApi = createAsyncThunk("cancellationreason/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CancellationreasonSuggetionListApi = createAsyncThunk("cancellationreason/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await cancellationreasonApiController
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

const cancellationreasonSlice = createSlice({
  name: "cancellationreason",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddCancellationreasonForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddCancellationreasonForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditCancellationreasonForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditCancellationreasonForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenCancellationreasonDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseCancellationreasonDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    OpenCancellationreasonSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseCancellationreasonsearchList: (state) => {
      state.isSearchList = "";
    },
    CancellationreasonSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [CancellationreasonStoreApi.pending]: () => {},
    [CancellationreasonStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [CancellationreasonStoreApi.rejected]: () => {},
    [CancellationreasonUpdateApi.pending]: () => {},
    [CancellationreasonUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [CancellationreasonUpdateApi.rejected]: () => {},
    [CancellationreasonListViewApi.pending]: () => {},
    [CancellationreasonListViewApi.fulfilled]: (state, action) => {
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
    [CancellationreasonListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [CancellationreasonSuggetionListApi.pending]: () => {},
    [CancellationreasonSuggetionListApi.fulfilled]: (state, action) => {
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
    [CancellationreasonSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [CancellationreasonDetailApi.pending]: () => {},
    [CancellationreasonDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [CancellationreasonDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [CancellationreasonDeleteApi.pending]: () => {},
    [CancellationreasonDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [CancellationreasonDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddCancellationreasonForm, CloseAddCancellationreasonForm, OpenEditCancellationreasonForm, CloseEditCancellationreasonForm, OpenCancellationreasonDetailModal, CloseCancellationreasonDetailModal, OpenCancellationreasonSearchList, CloseCancellationreasonsearchList, CancellationreasonSearchName } = cancellationreasonSlice.actions;
export default cancellationreasonSlice.reducer;
