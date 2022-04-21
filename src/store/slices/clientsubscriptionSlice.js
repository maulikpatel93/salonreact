import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientnoteApiController from "../../services/clientnote.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const ClientSubscriptionListViewApi = createAsyncThunk("clientsubscription/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientnoteApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isListView: [],
};

const clientsubscriptionSlice = createSlice({
  name: "clientsubscription",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [ClientSubscriptionListViewApi.pending]: () => {},
    [ClientSubscriptionListViewApi.fulfilled]: (state, action) => {
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
    [ClientSubscriptionListViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openNoteDrawer, closeNoteDrawer, openAddNoteForm, closeAddNoteForm, openEditNoteForm, closeEditNoteForm } = clientsubscriptionSlice.actions;
export default clientsubscriptionSlice.reducer;
