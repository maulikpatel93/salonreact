import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientvoucherApiController from "../../services/clientvoucher.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const ClientVoucherListViewApi = createAsyncThunk("clientvoucher/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await clientvoucherApiController
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

const clientvoucherSlice = createSlice({
  name: "clientvoucher",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [ClientVoucherListViewApi.pending]: () => {},
    [ClientVoucherListViewApi.fulfilled]: (state, action) => {
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
    [ClientVoucherListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openNoteDrawer, closeNoteDrawer, openAddNoteForm, closeAddNoteForm, openEditNoteForm, closeEditNoteForm } = clientvoucherSlice.actions;
export default clientvoucherSlice.reducer;
