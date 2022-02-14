import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import salonpermissionApiController from "../../services/salonpermission.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const salonpermissionListViewApi = createAsyncThunk("salonpermission/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await salonpermissionApiController
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

const salonpermissionSlice = createSlice({
  name: "salonpermission",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [salonpermissionListViewApi.pending]: () => {},
    [salonpermissionListViewApi.fulfilled]: (state, action) => {
      state.isListView = action.payload;
    },
    [salonpermissionListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset } = salonpermissionSlice.actions;
export default salonpermissionSlice.reducer;
