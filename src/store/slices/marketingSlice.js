import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import marketingApiController from "../../services/marketing.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const BirthdayOfferStoreApi = createAsyncThunk("marketing/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await marketingApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const BirthdayOfferUpdateApi = createAsyncThunk("marketing/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await marketingApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const BirthdayOfferGridViewApi = createAsyncThunk("marketing/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await marketingApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const BirthdayOfferDetailApi = createAsyncThunk("marketing/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await marketingApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const BirthdayOfferDeleteApi = createAsyncThunk("marketing/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await marketingApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isTabView: "",
  isOpenAddBirthdayOfferForm: "",
  isOpenEditBirthdayOfferForm: "",
  isOpenClientBirthdayListView: "",
};

const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    reset: () => initialState,
    MarketingTabGridView: (state, action) => {
      state.isTabView = action.payload;
    },
    OpenAddBirthdayOfferForm: (state, action) => {
      state.isOpenAddBirthdayOfferForm = action.payload;
    },
    OpenEditBirthdayOfferForm: (state, action) => {
      state.isOpenEditBirthdayOfferForm = action.payload;
    },
    OpenClientBirthdayList: (state, action) => {
      state.isOpenClientBirthdayListView = action.payload;
    },
  },
  extraReducers: {
    [BirthdayOfferStoreApi.pending]: () => {},
    [BirthdayOfferStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [BirthdayOfferStoreApi.rejected]: () => {},
    [BirthdayOfferUpdateApi.pending]: () => {},
    [BirthdayOfferUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [BirthdayOfferUpdateApi.rejected]: () => {},
    [BirthdayOfferGridViewApi.pending]: () => {},
    [BirthdayOfferGridViewApi.fulfilled]: (state, action) => {
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
    [BirthdayOfferGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [BirthdayOfferDetailApi.pending]: () => {},
    [BirthdayOfferDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [BirthdayOfferDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [BirthdayOfferDeleteApi.pending]: () => {},
    [BirthdayOfferDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [BirthdayOfferDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, MarketingTabGridView, OpenAddBirthdayOfferForm, OpenEditBirthdayOfferForm, OpenClientBirthdayList } = marketingSlice.actions;
export default marketingSlice.reducer;
