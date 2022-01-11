import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientApiController from "../../services/client.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const clientStoreApi = createAsyncThunk("client/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'create'))
      .catch((error) => HandleError(thunkAPI, error, 'create'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientUpdateApi = createAsyncThunk("client/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'update'))
      .catch((error) => HandleError(thunkAPI, error, 'update'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientListViewApi = createAsyncThunk("client/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'listview'))
      .catch((error) => HandleError(thunkAPI, error, 'listview'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientGridViewApi = createAsyncThunk("client/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'gridview'))
      .catch((error) => HandleError(thunkAPI, error, 'gridview'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientDetailApi = createAsyncThunk("client/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'detail'))
      .catch((error) => HandleError(thunkAPI, error, 'detail'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientDeleteApi = createAsyncThunk("client/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'delete'))
      .catch((error) => HandleError(thunkAPI, error, 'delete'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientSuggetionListApi = createAsyncThunk("client/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'suggetionlist'))
      .catch((error) => HandleError(thunkAPI, error, 'suggetionlist'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isTabView: "grid",
  isOpenedAddForm: "",
  isOpenedDetailModal: "",
  isGridView: [],
  isListView: [],
  isSuggetionListView: [],
  isDetailData: "",
  isClientDetailTab: "appointment",
  isSort: "",
  isSearchList: "",
  isSearchName: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    reset: () => initialState,
    clientTabListView: (state) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = "list";
    },
    clientTabGridView: (state) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = "grid";
    },
    openAddClientForm: (state = initialState) => {
      state.isOpenedDetailModal = "";
      state.isOpenedAddForm = "open";
    },
    closeAddClientForm: (state = initialState) => {
      state.isOpenedDetailModal = "";
      state.isOpenedAddForm = "";
    },
    openClientDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeClientDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    clientDetailTab: (state, action) => {
      state.isClientDetailTab = action.payload;
    },
    clientSort: (state, action) => {
      let sort = state.isSort ? state.isSort : {};
      state.isSort = Object.assign(sort, action.payload);
    },
    clientSortRemove: (state) => {
      state.isSort = "";
    },
    openClientSearchList: (state) => {
      state.isSearchList = "open";
    },
    closeClientSearchList: (state) => {
      state.isSearchList = "";
    },
    clientSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [clientStoreApi.pending]: () => {},
    [clientStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [clientStoreApi.rejected]: () => {},
    [clientUpdateApi.pending]: () => {},
    [clientUpdateApi.fulfilled]: (state, action) => {
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
    [clientUpdateApi.rejected]: () => {},
    [clientGridViewApi.pending]: () => {},
    [clientGridViewApi.fulfilled]: (state, action) => {
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
    [clientGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [clientListViewApi.pending]: () => {},
    [clientListViewApi.fulfilled]: (state, action) => {
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
    [clientListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [clientSuggetionListApi.pending]: ()=> {},
    [clientSuggetionListApi.fulfilled]: (state, action) => {
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
    [clientSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [clientDetailApi.pending]: () => {},
    [clientDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [clientDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [clientDeleteApi.pending]: () => {},
    [clientDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [clientDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, clientTabListView, clientTabGridView, openAddClientForm, closeAddClientForm, openClientDetailModal, closeClientDetailModal, clientDetailTab, clientSort, clientSortRemove, openClientSearchList, closeClientSearchList, clientSearchName } = clientSlice.actions;
export default clientSlice.reducer;
