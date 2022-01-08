import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import taxApiController from "../../services/tax.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const usersAdapter = createEntityAdapter();

export const taxOptions = createAsyncThunk("tax/taxOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await taxApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'taxOptions'))
      .catch((error) => HandleError(thunkAPI, error, 'taxOptions'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isTaxOption: [],
};

export const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: {
    [taxOptions.pending]: () => {},
    [taxOptions.fulfilled]: (state, action) => {
      state.isTaxOption = action.payload;
    },
    [taxOptions.rejected]: (state) => {
      state.isTaxOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset } = taxSlice.actions;
export default taxSlice.reducer;
