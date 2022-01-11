import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
import AuthService from "../../services/auth.service";

export const register = createAsyncThunk("auth/register", async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await AuthService.register(username, email, password)
      .then((response) => HandleResponse(thunkAPI, response, "register"))
      .catch((error) => HandleError(thunkAPI, error, "register"));
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage([message]));
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const login = createAsyncThunk("auth/login", async ({ email, password, remember_me }, thunkAPI) => {
  try {
    const resposedata = await AuthService.login(email, password, remember_me, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "login"))
      .catch((error) => HandleError(thunkAPI, error, "login"));
    if (resposedata && resposedata.payload && resposedata.payload !== undefined && !resposedata.payload.status) {
      const user = await AuthService.getUser({ auth_key: resposedata.payload.auth_key, token: resposedata.payload.token })
        .then((response) => HandleResponse(thunkAPI, response, "getuser"))
        .catch((error) => HandleError(thunkAPI, error, "getuser"));

      if (user && user.payload && user.payload !== undefined && !user.payload.status) {
        return thunkAPI.fulfillWithValue({ isLoggedIn: true, user: user.payload, token: resposedata.payload.token });
      } else {
        return user;
      }
    }
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const resposedata = await AuthService.logout();
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

const initialState = {
  token: "",
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authlogout: () => {
      return logout();
    },
  },
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isInitialized = true;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
    },
  },
});

export const { authlogout } = authSlice.actions;
export default authSlice.reducer;
