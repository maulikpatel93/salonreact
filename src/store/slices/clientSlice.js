import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientApiController from "../../services/client.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const ClientStoreApi = createAsyncThunk("client/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const ClientUpdateApi = createAsyncThunk("client/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const ClientListViewApi = createAsyncThunk("client/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ClientGridViewApi = createAsyncThunk("client/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ClientDetailApi = createAsyncThunk("client/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ClientDeleteApi = createAsyncThunk("client/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ClientSuggetionListApi = createAsyncThunk("client/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientApiController
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
  isSearchObj: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    reset: () => initialState,
    ClientTabListView: (state) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = "list";
    },
    ClientTabGridView: (state) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = "grid";
    },
    OpenAddClientForm: (state = initialState) => {
      state.isOpenedDetailModal = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddClientForm: (state = initialState) => {
      state.isOpenedDetailModal = "";
      state.isOpenedAddForm = "";
    },
    OpenClientDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseClientDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    ClientDetailTab: (state, action) => {
      state.isClientDetailTab = action.payload;
    },
    ClientSort: (state, action) => {
      let sort = state.isSort ? state.isSort : {};
      state.isSort = Object.assign(sort, action.payload);
    },
    ClientSortRemove: (state) => {
      state.isSort = "";
    },
    OpenClientSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseClientSearchList: (state) => {
      state.isSearchList = "";
    },
    ClientSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    ClientSearchObj: (state, action) => {
      state.isSearchObj = action.payload;
    }
  },
  extraReducers: {
    [ClientStoreApi.pending]: () => {},
    [ClientStoreApi.fulfilled]: (state, action) => {
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
    [ClientStoreApi.rejected]: () => {},
    [ClientUpdateApi.pending]: () => {},
    [ClientUpdateApi.fulfilled]: (state, action) => {
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
    [ClientUpdateApi.rejected]: () => {},
    [ClientGridViewApi.pending]: () => {},
    [ClientGridViewApi.fulfilled]: (state, action) => {
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
    [ClientGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [ClientListViewApi.pending]: () => {},
    [ClientListViewApi.fulfilled]: (state, action) => {
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
    [ClientListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [ClientSuggetionListApi.pending]: () => {},
    [ClientSuggetionListApi.fulfilled]: (state, action) => {
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
    [ClientSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [ClientDetailApi.pending]: () => {},
    [ClientDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [ClientDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [ClientDeleteApi.pending]: () => {},
    [ClientDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, ClientTabListView, ClientTabGridView, OpenAddClientForm, CloseAddClientForm, OpenClientDetailModal, CloseClientDetailModal, ClientDetailTab, ClientSort, ClientSortRemove, OpenClientSearchList, CloseClientSearchList, ClientSearchName, ClientSearchObj } = clientSlice.actions;
export default clientSlice.reducer;
