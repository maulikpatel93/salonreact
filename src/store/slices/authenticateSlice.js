import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

const initialState = {
  token: "",
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

export const logout = createAsyncThunk("authenticate/logout", async (thunkAPI) => {
  try {
    const resposedata = await AuthService
    .logout()
    .then((response) => HandleResponse(thunkAPI, response, 'logout'))
    .catch((error) => HandleError(thunkAPI, error, 'logout'));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = authenticateSlice.actions;

export default authenticateSlice.reducer;
