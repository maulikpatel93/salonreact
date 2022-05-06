import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientinvoiceApiController from "../../services/clientinvoice.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const ClientInvoiceListViewApi = createAsyncThunk("clientinvoice/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientinvoiceApiController
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

const clientinvoiceSlice = createSlice({
  name: "clientinvoice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [ClientInvoiceListViewApi.pending]: () => {},
    [ClientInvoiceListViewApi.fulfilled]: (state, action) => {
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
    [ClientInvoiceListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openNoteDrawer, closeNoteDrawer, openAddNoteForm, closeAddNoteForm, openEditNoteForm, closeEditNoteForm } = clientinvoiceSlice.actions;
export default clientinvoiceSlice.reducer;
