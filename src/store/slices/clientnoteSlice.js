import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientnoteApiController from "../../services/clientnote.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const clientnoteStoreApi = createAsyncThunk("clientnote/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientnoteUpdateApi = createAsyncThunk("clientnote/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const clientnoteGridViewApi = createAsyncThunk("clientnote/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientnoteDetailApi = createAsyncThunk("clientnote/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientnoteDeleteApi = createAsyncThunk("clientnote/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const clientnoteSuggetionListApi = createAsyncThunk("clientnote/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
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
  isGridView: [],
  isOpenedAddForm: "",
  isOpenedEditForm: "",
  isNoteDrawer: "",
};

const clientnoteSlice = createSlice({
  name: "clientnote",
  initialState,
  reducers: {
    reset: () => initialState,
    openNoteDrawer: (state) => {
      state.isNoteDrawer = "open";
      // state.isOpenedAddForm = "";
      // state.isOpenedEditForm = "";
    },
    closeNoteDrawer: (state) => {
      state.isNoteDrawer = "";
      // state.isOpenedAddForm = "";
      // state.isOpenedEditForm = "";
    },
    openAddNoteForm: (state = initialState) => {
      state.isOpenedAddForm = "open";
      state.isOpenedEditForm = "";
    },
    closeAddNoteForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openEditNoteForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditNoteForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
  },
  extraReducers: {
    [clientnoteStoreApi.pending]: () => {},
    [clientnoteStoreApi.fulfilled]: () => {},
    [clientnoteStoreApi.rejected]: () => {},
    [clientnoteUpdateApi.pending]: () => {},
    [clientnoteUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      let isGridView = state.isGridView && state.isGridView.data ? state.isGridView.data : state.isGridView;
      const existingGridData = isGridView ? isGridView.find((event) => event.id === id) : "";
      if (existingGridData) {
        Object.keys(changes).map((keyName) => {
          existingGridData[keyName] = changes[keyName];
        });
      }
    },
    [clientnoteUpdateApi.rejected]: () => {},
    [clientnoteGridViewApi.pending]: () => {},
    [clientnoteGridViewApi.fulfilled]: (state, action) => {
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
    [clientnoteGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [clientnoteDeleteApi.pending]: () => {},
    [clientnoteDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openNoteDrawer, closeNoteDrawer, openAddNoteForm, closeAddNoteForm, openEditNoteForm, closeEditNoteForm } = clientnoteSlice.actions;
export default clientnoteSlice.reducer;
